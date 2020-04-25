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
  wResize = randomText[1];
  fontSize: number;
  wfontSize: number;
  code = {
    install:
      'https://gist.githubusercontent.com/pikselinweb/81ec1becf4179f850dbf7214baeab123/raw/7aaeb38db34baeb33654d2c2a03c19acbe221083/install.sh',
    basic:
      'https://gist.githubusercontent.com/pikselinweb/81ec1becf4179f850dbf7214baeab123/raw/47c67f465d658e1ae44e7eb3589487780f056a5f/basic.html',
    full:
      'https://gist.githubusercontent.com/pikselinweb/81ec1becf4179f850dbf7214baeab123/raw/a4fc48f0493ad71121af34ee34f4626efc769787/full.html',
    fullts:
      'https://gist.githubusercontent.com/pikselinweb/81ec1becf4179f850dbf7214baeab123/raw/18c18cb0f5de3ad59f490a9ce9fea3b550128069/full.ts',
    module:
      'https://gist.githubusercontent.com/pikselinweb/81ec1becf4179f850dbf7214baeab123/raw/7aaeb38db34baeb33654d2c2a03c19acbe221083/module.ts',
    resizeBasic:
      'https://gist.githubusercontent.com/pikselinweb/81ec1becf4179f850dbf7214baeab123/raw/f915bf0ea2584e805f9217df975ca19f68fe3850/window-resize-basic.html',
    resizeFull:
      'https://gist.githubusercontent.com/pikselinweb/81ec1becf4179f850dbf7214baeab123/raw/c2edf3cf71b4097ef628323863e39010cacc430c/window-resize-full.html',
  };
  basicRandom() {
    this.basic = this.randomText;
  }
  resizeRandom() {
    this.wResize = this.randomText;
  }
  get randomText() {
    const randomNumber = Math.floor(Math.random() * this.rndText.length);
    return this.rndText[randomNumber];
  }
  newFontSize(fSize: number) {
    this.fontSize = fSize;
  }
  wnewFontSize(fSize: number) {
    this.wfontSize = fSize;
  }
}
