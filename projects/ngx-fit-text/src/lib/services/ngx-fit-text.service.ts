import { Injectable } from '@angular/core';
import { STYLE, FITTEXT } from '../fit-text.model';

@Injectable({
  providedIn: 'root',
})
export class NgxFitTextService {
  constructor() {}
  setStyle(element, style: STYLE) {
    element.style[style.propery] = style.value;
  }
  setMultipleStyle(element, styles: STYLE[]) {
    for (const style of styles) {
      this.setStyle(element, style);
    }
  }
  resizeText(fitObj: FITTEXT): number {
    let mainWidth = fitObj.mainDiv.offsetWidth;
    let fWidth = fitObj.fitDiv.offsetWidth;
    let mainHeight = fitObj.mainDiv.offsetHeight;
    let fHeight = fitObj.fitDiv.offsetHeight;
    let fontSize: number = this.makeNumber(fitObj.maxSize);
    const minSize: number = this.makeNumber(fitObj.minSize);
    let i = 0;
    if (fitObj.logs === true) {
      console.group(' NGX FIT TEXT LOGS');
      console.groupCollapsed('BEFORE RESIZE');
      console.log('max font size: ', fitObj.maxSize);
      console.log('min font size: ', fitObj.minSize);
      console.log('main div width: ', mainWidth);
      console.log('fit div width: ', fWidth);
      console.log('main div height: ', mainHeight);
      console.log('fit div height: ', fHeight);
      console.groupEnd();
    }
    if (fitObj.divHeight) {
      while (fHeight > mainHeight || fWidth > mainWidth) {
        if (minSize >= fontSize) {
          break;
        }
        i++;
        fontSize -= 2;
        this.setStyle(fitObj.fitDiv, {
          propery: 'fontSize',
          value: `${fontSize}px`,
        });
        mainWidth = fitObj.mainDiv.offsetWidth;
        fWidth = fitObj.fitDiv.offsetWidth;
        mainHeight = fitObj.mainDiv.offsetHeight;
        fHeight = fitObj.fitDiv.offsetHeight;
        if (fitObj.logs === true) {
          console.log(fitObj.logs);
          console.groupCollapsed(`STEP ${i}`);
          console.log('current font size:', fontSize);
          console.log('main div height', mainHeight);
          console.log('fit div height', fHeight);
          console.log('main div width', mainWidth);
          console.log('fit div width', fWidth);
          console.groupEnd();
        }
      }
    } else {
      while (fWidth > mainWidth) {
        if (minSize >= fontSize) {
          break;
        }
        i++;
        fontSize -= 2;
        this.setStyle(fitObj.fitDiv, {
          propery: 'fontSize',
          value: `${fontSize}px`,
        });
        mainWidth = fitObj.mainDiv.offsetWidth;
        fWidth = fitObj.fitDiv.offsetWidth;
        if (fitObj.logs === true) {
          console.groupCollapsed(`STEP ${i}`);
          console.log('current font size:', fontSize);
          console.log('main div width', mainWidth);
          console.log('fit div width', fWidth);
          console.groupEnd();
        }
      }
    }
    console.groupEnd();

    this.setStyle(fitObj.fitDiv, {
      propery: 'verticalAlign',
      value: fitObj.middle ? 'middle' : 'top',
    });

    this.setStyle(fitObj.fitDiv, { propery: 'color', value: 'inherit' });
    return fontSize;
  }
  private makeNumber(value: string): number {
    const res = value.replace(/\D/g, '');
    return parseInt(res, 10);
  }
}
