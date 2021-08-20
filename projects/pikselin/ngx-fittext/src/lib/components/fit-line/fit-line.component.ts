import {
  Component,
  AfterViewInit,
  OnDestroy,
  Input,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { fromEvent, Observable, Subscription } from 'rxjs';
import { FitLineInfo } from '../../models';
@Component({
  selector: 'fit-line',
  templateUrl: './fit-line.component.html',
  styleUrls: ['./fit-line.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FitLineComponent implements AfterViewInit, OnDestroy {
  elChildren: [];
  @Input() stepSize: number = 2;
  @Input() calcOnResize: boolean = false;
  @Input() minFontSize: number = 10;
  @Input() maxFontSize: number = 500;
  @Output() showInfo = new EventEmitter<FitLineInfo>();
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    //resize event
    if (this.calcOnResize) {
      this.resizeObservable$ = fromEvent(window, 'resize');
      this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
        this.fitToLine();
      });
    }
    // sometimes cant calculate after view init, i set timeout to fix it
    setTimeout(() => {
      this.fitToLine();
    }, 20);
  }
  ngOnDestroy() {
    // unsubscribe resize event
    this.resizeSubscription$.unsubscribe();
  }
  // fitting line calculation
  async fitToLine(delay?: number) {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', 0);
    // refreshing need delay
    if (delay) {
      await this.delayView(delay);
    }
    // get child elements
    this.elChildren = this.el.nativeElement.childNodes;

    // resize child elements
    for (let index = 0; index < this.elChildren.length; index++) {
      const element = this.el.nativeElement.childNodes[index];
      this.renderer.setStyle(element, 'white-space', `nowrap`);
      const fs = getComputedStyle(element).getPropertyValue('font-size');
      const { size, unit } = this.splitFontSize(fs);
      // if overflow descrease font size
      if (this.isOverflow(element)) {
        this.resizeToSmall(element, size, unit);
      } else {
        // increase font size
        this.resizeToBig(element, size, unit);
      }
    }
  }
  private resizeToSmall(htmlEl: any, fontSize: number, unit: string) {
    while (this.isOverflow(htmlEl)) {
      fontSize -= this.stepSize;
      if (fontSize <= this.minFontSize) {
        this.renderer.setStyle(
          htmlEl,
          'font-size',
          `${this.minFontSize}${unit}`
        );
        this.renderer.setStyle(htmlEl, 'white-space', `normal`);
        this.showInfo.emit({
          fontSize: this.minFontSize + unit,
          effectedHtm: htmlEl,
        });
        break;
      }
      this.renderer.setStyle(htmlEl, 'font-size', `${fontSize}${unit}`);
      this.showInfo.emit({
        fontSize: this.minFontSize + unit,
        effectedHtm: htmlEl,
      });
    }

    this.renderer.setStyle(this.el.nativeElement, 'opacity', 1);
  }
  private resizeToBig(htmlEl: any, fontSize: number, unit: string) {
    while (!this.isOverflow(htmlEl)) {
      fontSize += this.stepSize;
      this.renderer.setStyle(htmlEl, 'font-size', `${fontSize}${unit}`);

      if (this.isOverflow(htmlEl)) {
        fontSize -= this.stepSize;
        this.renderer.setStyle(htmlEl, 'font-size', `${fontSize}${unit}`);
        this.showInfo.emit({
          fontSize: this.minFontSize + unit,
          effectedHtm: htmlEl,
        });
        break;
      }

      if (fontSize >= this.maxFontSize) {
        this.renderer.setStyle(
          htmlEl,
          'font-size',
          `${this.maxFontSize}${unit}`
        );
        this.showInfo.emit({
          fontSize: this.minFontSize + unit,
          effectedHtm: htmlEl,
        });
        break;
      }
      this.showInfo.emit({
        fontSize: this.minFontSize + unit,
        effectedHtm: htmlEl,
      });
    }
    // if calculated font size smaller than min font size
    if (fontSize <= this.minFontSize) {
      this.renderer.setStyle(htmlEl, 'font-size', `${this.minFontSize}${unit}`);
      this.renderer.setStyle(htmlEl, 'white-space', `normal`);
      this.showInfo.emit({
        fontSize: this.minFontSize + unit,
        effectedHtm: htmlEl,
      });
    }

    this.renderer.setStyle(this.el.nativeElement, 'opacity', 1);
  }
  // refresh if text changed programmatically
  public refreshText() {
    this.fitToLine(10);
  }
  private isOverflow(htmlEl: any) {
    return htmlEl.scrollWidth > htmlEl.offsetWidth;
  }

  private splitFontSize(fs: string) {
    const size = fs.match(/\d+/g);
    const unit = fs.match(/[a-zA-Z]+/g);
    return {
      size: size ? Number(size[0]) : 2,
      unit: unit ? unit[0] : 'px',
    };
  }
  private async delayView(delayMs: number) {
    return new Promise((resolve) => setTimeout(resolve, delayMs));
  }
}
