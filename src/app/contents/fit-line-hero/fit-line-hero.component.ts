import { Component, OnInit, ViewChild } from '@angular/core';
import { FitLineComponent, FitLineInfo } from '@pikselin/ngx-fittext';

@Component({
  selector: 'fit-line-hero',
  templateUrl: './fit-line-hero.component.html',
  styleUrls: ['./fit-line-hero.component.scss'],
})
export class FitLineHeroComponent implements OnInit {
  @ViewChild('dynamicFitText') private dynamicFitText: FitLineComponent;
  fitLineSimpleUsage = `
  <mat-card>
    <fit-line><div>Lorem ipsum dolor sit amet.</div></fit-line>
  </mat-card>
  `;
  fitlineTut1 = `
  <fit-line>
    <div style="background-color: orange">
      AM<b style="color: tomato">O</b>K
    </div>
    <div style="background-color: teal; color: #fafafa">Stefan Zweig</div>
  </fit-line>
  `;
  fitLineTut2Html = `
  <mat-card class="mx-auto my-3 w-720px" *ngIf="exampleLine">
    <fit-line #dynamicFitText>
      <div>{{ exampleLine }}</div>
    </fit-line>
  </mat-card>
  <div class="py-3 d-flex justify-content-center">
    <button mat-raised-button color="primary" (click)="setRandomQuote()">
      Random Quote
    </button>
  </div>
  `;
  fitLineTut2Ts = `
  import { Component, OnInit, ViewChild } from '@angular/core';
  import { FitLineComponent } from '@pikselin/ngx-fittext';
  @Component({
    selector: 'fit-line-hero',
    templateUrl: './fit-line-hero.component.html',
    styleUrls: ['./fit-line-hero.component.scss'],
  })
  export class FitLineHeroComponent implements OnInit {
    @ViewChild('dynamicFitText') dynamicFitText: FitLineComponent;
    exampleLines = [
      'Peace at Home, Peace in the World',
      'Our true mentor in life is science.',
      'The unexamined life is not worth living',
      'To be or not to be',
      'An ounce of practice is worth a thousand words.',
      'I am indebted to my father for living, but to my teacher for living well.',
      'It is during our darkest moments that we must focus to see the light.',
      'The supreme art of war is to subdue the enemy without fighting.',
    ];
    exampleLine: string;
    ngOnInit(): void {
      this.setRandomQuote();
    }
    setRandomQuote() {
      this.exampleLine =
        this.exampleLines[Math.floor(Math.random() * this.exampleLines.length)];
      this.dynamicFitText.refreshText();
    }
  `;
  exampleLines = [
    'Peace at Home, Peace in the World',
    'Our true mentor in life is science.',
    'The unexamined life is not worth living',
    'To be or not to be',
    'An ounce of practice is worth a thousand words.',
    'I am indebted to my father for living, but to my teacher for living well.',
    'It is during our darkest moments that we must focus to see the light.',
    'The supreme art of war is to subdue the enemy without fighting.',
  ];
  exampleLine: string;
  constructor() {}

  ngOnInit(): void {
    this.exampleLine =
      this.exampleLines[Math.floor(Math.random() * this.exampleLines.length)];
  }
  setRandomQuote() {
    this.exampleLine =
      this.exampleLines[Math.floor(Math.random() * this.exampleLines.length)];
    this.dynamicFitText.refreshText();
  }
  consoleFitLineInfo(fInfo: FitLineInfo) {
    console.log({ fInfo });
  }
}
