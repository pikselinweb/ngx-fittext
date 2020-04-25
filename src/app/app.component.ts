import { Component } from '@angular/core';
import { randomText } from './random.text';
@Component({
  selector: 'fittext-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  rndText = [...randomText];
  basic = randomText[0];
  fontSize: number;
  code = {
    basic:
      'https://gist.githubusercontent.com/pikselinweb/81ec1becf4179f850dbf7214baeab123/raw/47c67f465d658e1ae44e7eb3589487780f056a5f/basic.html',
    full:
      'https://gist.githubusercontent.com/pikselinweb/81ec1becf4179f850dbf7214baeab123/raw/a4fc48f0493ad71121af34ee34f4626efc769787/full.html',
    fullts:
      'https://gist.githubusercontent.com/pikselinweb/81ec1becf4179f850dbf7214baeab123/raw/18c18cb0f5de3ad59f490a9ce9fea3b550128069/full.ts',
    module:
      'https://gist.githubusercontent.com/pikselinweb/81ec1becf4179f850dbf7214baeab123/raw/f65f716c9361a78d1db6d4ba8d0f056fb28fb623/module.ts',
  };
  basicRandom() {
    this.basic = this.randomText;
  }
  get randomText() {
    const randomNumber = Math.floor(Math.random() * this.rndText.length);
    return this.rndText[randomNumber];
  }
  newFontSize(fSize: number) {
    this.fontSize = fSize;
  }
}
