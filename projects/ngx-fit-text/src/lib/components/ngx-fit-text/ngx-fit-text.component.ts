import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { NgxFitTextService } from '../../services';
import { FITTEXT } from '../../fit-text.model';
@Component({
  selector: 'fit-text',
  templateUrl: './ngx-fit-text.component.html',
  styleUrls: ['../../styles/ngx-fit-text.component.scss'],
})
export class NgxFitTextComponent implements AfterViewInit, OnChanges {
  @Input() text: string;
  @Input() maxFontSize: string;
  @Input() minFontSize: string;
  @Input() height: string;
  @Input() width: string;
  @Input() delay: number;
  @Input() middle: boolean;
  @Input() showLogs: boolean;

  @Output() resized = new EventEmitter<number>();

  @ViewChild('mainDiv') mainDiv: ElementRef;
  @ViewChild('fitDiv') fitDiv: ElementRef;
  waitFitText;

  constructor(private fitService: NgxFitTextService) {}
  ngAfterViewInit() {}
  ngOnChanges(changes) {
    if (changes.text) {
      this.fitText();
    }
  }
  fitText() {
    clearTimeout(this.waitFitText);
    if (this.fitDiv) {
      this.fitService.setMultipleStyle(this.fitDiv.nativeElement, [
        { propery: 'color', value: 'transparent' },
        { propery: 'fontSize', value: this.maxFontSize || '120px' },
      ]);
    }
    this.waitFitText = setTimeout(() => {
      const fitObj: FITTEXT = {
        mainDiv: this.mainDiv.nativeElement,
        fitDiv: this.fitDiv.nativeElement,
        maxSize: this.maxFontSize || '120px',
        minSize: this.minFontSize || '8px',
        divHeight: this.height,
        logs: this.showLogs || false,
        middle: this.middle || false,
      };
      const newFontSize = this.fitService.resizeText(fitObj);
      this.resized.emit(newFontSize);
    }, this.delay || 100);
  }
}
