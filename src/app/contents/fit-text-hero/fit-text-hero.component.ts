import { Component, OnInit, ViewChild } from '@angular/core';
import {FitTextComponent} from '@pikselin/ngx-fittext'
@Component({
  selector: 'fit-text-hero',
  templateUrl: './fit-text-hero.component.html',
  styleUrls: ['./fit-text-hero.component.scss'],
})
export class FitTextHeroComponent implements OnInit {
  @ViewChild('dynamicFitText') private dynamicFitText: FitTextComponent;
  readonly ataturkQuotes = [
    'Everything we see in the world is the creative work of women.',
    'Heroes who shed their blood and lost their lives! You are now lying in the soil of a friendly country. Therefore rest in peace. There is no difference between the Johnnies and Mehmets to us where they lie side by side here in this country of ours. You, the mothers, who sent their sons from far away countries wipe away your tears; your sons are now lying in our bosom and are in peace. After having lost their lives on this land they have become our sons as well.',
    'Teachers are the one and only people who save nations.',
    'Peace at Home, Peace in the World',
    "Unless a nation's life faces peril, war is murder.",
    'Our true mentor in life is science.',
    `Victory is for those who can say "Victory is mine". Success is for those who can begin saying "I will succeed" and say "I have succeeded" in the end.`,
    'If one day, my words are against science, choose science.',
    'The biggest battle is the war against ignorance.',
    'My people are going to learn the principles of democracy the dictates of truth and the teachings of science. Superstition must go. Let them worship as they will, every man can follow his own conscience provided it does not interfere with sane reason or bid him act against the liberty of his fellow men.',
  ];
  ataturkQuote = this.randomQuote;
  simpleUsage = `
  <mat-card class="my-3" style="width:400px">
        <fit-text height="200px" [stepSize]="1" style="align-items: center;" >
          Aliquam erat volutpat. Curabitur et tincidunt nisl. Nunc non
          pellentesque erat. Ut non dignissim nunc. Aenean condimentum venenatis
          augue vel ultricies. Ut consequat egestas purus.
        </fit-text>
      </mat-card>
  `;
  fitBoxExample1 = `
  <div
  style="
    width: 500px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  "
>
  <fit-text height="250px" width="250px"   style="background-color: cyan; justify-content: center; align-items: center;">C</fit-text>
  <fit-text height="250px" width="250px"  style="background-color: magenta;justify-content: center;align-items: center;">M</fit-text>
  <fit-text height="250px" width="250px"  style="background-color: yellow;justify-content: center;align-items: center;">Y</fit-text>
  <fit-text height="250px" width="250px"  style="background-color: black; color:#efefef;justify-content: center;align-items: center;">K</fit-text>
</div>
  `;
  fitBoxExampleHtml =
  `
  <div
    class="mat-elevation-z5 mt-3"
    style="
      padding: 10px;
      background-color: #efefef;
      width: 600px;
      margin-top: 30px;
      border-radius: 6px;
    "
  >
    <img src="assets/ataturk-ders.jpg" alt="Atatürk ders dinlerken" />
    <div
      style="background-color: #fafafa; border-radius: 6px; padding: 10px"
      class="mt-3"
    >
      <fit-text
        #dynamicFitText
        height="200px"
        width="560px"
        style="justify-content: center; align-items: center"
        >{{ ataturkQuote }}</fit-text
      >
    </div>
  </div>
  `
  fitBoxExampleTs = `
import { Component, OnInit, ViewChild } from '@angular/core';
import {FitTextComponent} from '@pikselin/ngx-fittext'
@Component({
  selector: 'fit-text-hero',
  templateUrl: './fit-text-hero.component.html',
  styleUrls: ['./fit-text-hero.component.scss'],
})
export class FitTextHeroComponent implements OnInit {
  @ViewChild('dynamicFitText') private dynamicFitText: FitTextComponent;
  readonly ataturkQuotes = [
    'Everything we see in the world is the creative work of women.',
    'Heroes who shed their blood and lost their lives! You are now lying in the soil of a friendly country. Therefore rest in peace. There is no difference between the Johnnies and Mehmets to us where they lie side by side here in this country of ours. You, the mothers, who sent their sons from far away countries wipe away your tears; your sons are now lying in our bosom and are in peace. After having lost their lives on this land they have become our sons as well.',
    'Teachers are the one and only people who save nations.',
    'Peace at Home, Peace in the World',
    "Unless a nation's life faces peril, war is murder.",
    'Our true mentor in life is science.',
    'Victory is for those who can say "Victory is mine". Success is for those who can begin saying "I will succeed" and say "I have succeeded" in the end.',
    'If one day, my words are against science, choose science.',
    'The biggest battle is the war against ignorance.',
    'My people are going to learn the principles of democracy the dictates of truth and the teachings of science. Superstition must go. Let them worship as they will, every man can follow his own conscience provided it does not interfere with sane reason or bid him act against the liberty of his fellow men.',
  ];
  ataturkQuote = this.randomQuote;
  constructor() {}
  ngOnInit(): void {}
  get randomQuote() {
    return this.ataturkQuotes[
      Math.floor(Math.random() * (this.ataturkQuotes.length - 1))
    ];
  }
  setRandomQuote() {
    this.ataturkQuote = this.randomQuote;
    this.dynamicFitText.refreshText();
  }
}

  `
  constructor() {}

  ngOnInit(): void {}

  get randomQuote() {
    console.log(this.ataturkQuotes.length,Math.floor(Math.random() * (this.ataturkQuotes.length - 1)))
    return this.ataturkQuotes[
      Math.floor(Math.random() * (this.ataturkQuotes.length - 1))
    ];
  }
  setRandomQuote() {
    this.ataturkQuote = this.randomQuote;
    console.log("quote",this.ataturkQuote)
    this.dynamicFitText.refreshText();
  }
}
