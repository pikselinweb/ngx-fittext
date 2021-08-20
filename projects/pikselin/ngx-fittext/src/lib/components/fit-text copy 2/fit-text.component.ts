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
  @Input() lineHeight: string = 'normal';
  @Input() textAlign: string = 'left';
  @Input() verticalAlign: boolean = false;
  @Output() showInfo = new EventEmitter<any>();
  @ViewChild('wrapperDiv') wrapperDiv: ElementRef;
  @ViewChild('controllerDiv') controllerDiv: ElementRef;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  constructor(private renderer: Renderer2) {}

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
    if (this.verticalAlign) {
      this.renderer.setStyle(this.controllerDiv.nativeElement, 'top', '50%');
      this.renderer.setStyle(
        this.controllerDiv.nativeElement,
        'transform',
        'translateY(-50%)'
      );
    }
    this.renderer.setStyle(
      this.wrapperDiv.nativeElement,
      'text-align',
      this.textAlign
    );


    const controllerWidth = this.controllerDiv.nativeElement.offsetWidth;
    const controllerHeight = this.controllerDiv.nativeElement.offsetHeight;
    const scrollWidth = this.controllerDiv.nativeElement.scrollWidth;
    const scrollHeight = this.controllerDiv.nativeElement.scrollHeight;

    if (controllerHeight < scrollWidth || controllerWidth < scrollHeight ) {
      console.log("small")
      this.resizeToSmall();
    } else {
      console.log("big")
      this.resizeToBig();
    }
  }
  private resizeToSmall() {
    while (
      this.wrapperDiv.nativeElement.offsetWidth <
        this.controllerDiv.nativeElement.offsetWidth ||
      this.wrapperDiv.nativeElement.offsetHeight <
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
  }
  private resizeToBig() {
    while (
      this.controllerDiv.nativeElement.offsetWidth <=
        this.wrapperDiv.nativeElement.offsetWidth ||
      this.controllerDiv.nativeElement.offsetHeight <=
        this.wrapperDiv.nativeElement.offsetHeight
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
          this.wrapperDiv.nativeElement.offsetWidth ||
        this.controllerDiv.nativeElement.offsetHeight >
          this.wrapperDiv.nativeElement.offsetHeight ||
        this.controllerDiv.nativeElement.scrollHeight >
          this.controllerDiv.nativeElement.offsetHeight ||
        this.controllerDiv.nativeElement.scrollWidth >
          this.controllerDiv.nativeElement.offsetWidth
      ) {
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
