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
  selector: 'fit-text[height]',
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

  @Output() showInfo = new EventEmitter<any>();

  @ViewChild('controllerDiv') controllerDiv: ElementRef;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

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
    // prevent overflow text when resizing
    this.renderer.setStyle(this.controllerDiv.nativeElement, 'opacity', 0);
    // refreshing need delay
    if (delay) {
      await this.delayView(delay);
    }

    this.renderer.setStyle(
      this.el.nativeElement,
      'width',
      this.width || '100%'
    );
    this.renderer.setStyle(this.el.nativeElement, 'height', this.height);

    const wrapperWidth = this.el.nativeElement.offsetWidth;
    const wrapperHeight = this.el.nativeElement.offsetHeight;
    const controllerWidth = this.controllerDiv.nativeElement.offsetWidth;
    const controllerHeight = this.controllerDiv.nativeElement.offsetHeight;
    const scrollWidth = this.controllerDiv.nativeElement.scrollWidth;
    const scrollHeight = this.controllerDiv.nativeElement.scrollHeight;

    if (
      wrapperWidth < controllerWidth ||
      wrapperHeight < controllerHeight ||
      scrollWidth < controllerWidth ||
      scrollHeight < controllerHeight
    ) {
      this.resizeToSmall();
    } else {
      this.resizeToBig();
    }
  }
  // refresh if text changed programmatically
  public refreshText() {
    this.fitToBox(50);
  }
  private resizeToSmall() {
    while (
      this.el.nativeElement.offsetWidth <
        this.controllerDiv.nativeElement.offsetWidth ||
      this.el.nativeElement.offsetHeight <
        this.controllerDiv.nativeElement.offsetHeight ||
      this.controllerDiv.nativeElement.offsetHeight <
        this.controllerDiv.nativeElement.scrollHeight ||
      this.controllerDiv.nativeElement.offsetWidth <
        this.controllerDiv.nativeElement.scrollWidth
    ) {
      const fs = getComputedStyle(
        this.controllerDiv.nativeElement
      ).getPropertyValue('font-size');
      const { size, unit } = this.splitFontSize(fs);

      let fontSize = size;
      if (fontSize <= this.minFontSize) {
        break;
      }
      fontSize -= this.stepSize;

      this.renderer.setStyle(
        this.controllerDiv.nativeElement,
        'font-size',
        `${fontSize}${unit}`
      );
      this.showInfo.emit({
        fontSize: `${fontSize}${unit}`,
      });
    }
    this.renderer.setStyle(this.controllerDiv.nativeElement, 'opacity', 1);
  }
  private resizeToBig() {
    while (
      this.controllerDiv.nativeElement.offsetWidth <=
        this.el.nativeElement.offsetWidth ||
      this.controllerDiv.nativeElement.offsetHeight <=
        this.el.nativeElement.offsetHeight
    ) {
      const fs = getComputedStyle(
        this.controllerDiv.nativeElement
      ).getPropertyValue('font-size');
      const { size, unit } = this.splitFontSize(fs);

      let fontSize = size;
      if (fontSize >= this.maxFontSize) {
        break;
      }
      fontSize += this.stepSize;
      // console.log({fontSize,divHeight:this.controllerDiv.nativeElement.offsetHeight,elHeight: this.el.nativeElement.offsetHeight})
      this.renderer.setStyle(
        this.controllerDiv.nativeElement,
        'font-size',
        `${fontSize}${unit}`
      );
      this.showInfo.emit({
        fontSize: `${fontSize}${unit}`,
      });
      if (
        this.controllerDiv.nativeElement.offsetWidth >
          this.el.nativeElement.offsetWidth ||
        this.controllerDiv.nativeElement.offsetHeight >
          this.el.nativeElement.offsetHeight ||
        this.controllerDiv.nativeElement.scrollHeight >
          this.controllerDiv.nativeElement.offsetHeight + 1 ||
        this.el.nativeElement.scrollWidth > this.el.nativeElement.offsetWidth
      ) {
        // console.log("over",{fontSize,divHeight:this.controllerDiv.nativeElement.offsetHeight,elHeight: this.el.nativeElement.offsetHeight,cSH:this.controllerDiv.nativeElement.scrollHeight})
        fontSize -= this.stepSize;
        this.renderer.setStyle(
          this.controllerDiv.nativeElement,
          'font-size',
          `${fontSize}${unit}`
        );
        this.showInfo.emit({
          fontSize: `${fontSize}${unit}`,
        });
        break;
      }
    }
    this.renderer.setStyle(this.controllerDiv.nativeElement, 'opacity', 1);
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
