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
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
@Component({
  selector: 'fit-text',
  templateUrl: './fit-text.component.html',
  styleUrls: ['./fit-text.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FitTextComponent implements AfterViewInit, OnDestroy {
  @Input() stepSize: number = 2;
  @Input() calcOnResize: boolean = false;
  @Input() minFontSize: number = 10;
  @Input() maxFontSize: number = 500;
  @Input() height: string;
  @Input() width: string;
  @Input() spaceBetweenLines: number = 5;
  @Output() showInfo = new EventEmitter<any>();
  @ViewChild('wrapperDiv') wrapperDiv: ElementRef;
  @ViewChild('controllerDiv') controllerDiv: ElementRef;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    //resize event
    if (this.calcOnResize) {
      this.resizeObservable$ = fromEvent(window, 'resize');
      this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
        this.fitToBox();
      });
    }
    this.fitToBox(20);
  }
  ngOnDestroy(): void {
    // unsubscribe resize event
    this.resizeSubscription$.unsubscribe();
  }
  async fitToBox(delay?: number) {
    // refreshing need delay
    if (delay) {
      await this.delayView(delay);
    }
    const wrapperWidth = this.wrapperDiv.nativeElement.offsetWidth;
    const wrapperHeight = this.wrapperDiv.nativeElement.offsetHeight;
    const controllerWidth = this.controllerDiv.nativeElement.offsetWidth;
    const controllerHeight = this.controllerDiv.nativeElement.offsetHeight;
    if (wrapperWidth < controllerWidth || wrapperHeight < controllerHeight) {
      console.log('font küçült');
      this.resizeToSmall();
    } else if (
      wrapperWidth >= controllerWidth &&
      wrapperHeight > controllerHeight
    ) {
      console.log('font büyüt');
      this.resizeToBig();
    }
  }
  private resizeToSmall() {
    while (
      this.wrapperDiv.nativeElement.offsetWidth <
        this.controllerDiv.nativeElement.offsetWidth ||
      this.wrapperDiv.nativeElement.offsetHeight <
        this.controllerDiv.nativeElement.offsetHeight
    ) {
      const fs = getComputedStyle(
        this.wrapperDiv.nativeElement
      ).getPropertyValue('font-size');
      const { size, unit } = this.splitFontSize(fs);
      console.log(size);
      let fontSize = size;
      if (fontSize <= this.minFontSize) {
        break;
      }
      fontSize -= this.stepSize;
      console.log(fontSize);
      this.renderer.setStyle(
        this.wrapperDiv.nativeElement,
        'font-size',
        `${fontSize}${unit}`
      );
      this.showInfo.emit({
        fontSize: `${fontSize}${unit}`,
      });
    }
  }
  private resizeToBig() {
    while (
      this.wrapperDiv.nativeElement.offsetWidth >=
        this.controllerDiv.nativeElement.offsetWidth ||
      this.wrapperDiv.nativeElement.offsetHeight >=
        this.controllerDiv.nativeElement.offsetHeight
    ) {
      const fs = getComputedStyle(
        this.wrapperDiv.nativeElement
      ).getPropertyValue('font-size');
      const { size, unit } = this.splitFontSize(fs);
      console.log(size);
      let fontSize = size;
      if (fontSize >= this.maxFontSize) {
        break;
      }
      fontSize += this.stepSize;
      this.renderer.setStyle(
        this.wrapperDiv.nativeElement,
        'font-size',
        `${fontSize}${unit}`
      );

      this.renderer.setStyle(
        this.el.nativeElement,
        'margin-top',
        `-${2 * this.spaceBetweenLines}${unit}`
      );
      this.showInfo.emit({
        fontSize: `${fontSize}${unit}`,
      });
      this.setMiddle();
      console.log('fs', fontSize);
      if (
        this.wrapperDiv.nativeElement.offsetWidth <
          this.controllerDiv.nativeElement.offsetWidth ||
        this.wrapperDiv.nativeElement.offsetHeight <
          this.controllerDiv.nativeElement.offsetHeight
      ) {
        fontSize -= this.stepSize;
        this.renderer.setStyle(
          this.wrapperDiv.nativeElement,
          'font-size',
          `${fontSize}${unit}`
        );

        this.renderer.setStyle(
          this.el.nativeElement,
          'margin-top',
          `-${2 * this.spaceBetweenLines}${unit}`
        );
        this.showInfo.emit({
          fontSize: `${fontSize}${unit}`,
        });
        this.setMiddle();
        console.log('fs büyük', fontSize);
        break;
      }
    }
  }
  private setMiddle() {
    // const wrapperHeight = this.wrapperDiv.nativeElement.offsetHeight;
    // const controllerHeight = this.controllerDiv.nativeElement.offsetHeight;

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
