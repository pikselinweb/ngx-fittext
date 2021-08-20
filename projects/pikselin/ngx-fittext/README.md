# Ngx-FitText

**@pikselin/ngx-fittext** is an Angular library that allow you fit text in a box or a line.



[Demo Page](https://ngx-fittext.vercel.app) | [Stackblitz Example](https://stackblitz.com/edit/ngx-fittextv2)

> You can see in examples Angular Material components like __mat-card__. These are not required. It is only for showing examples clearly in demo page.

- [Ngx-FitText](#ngx-fittext)
  - [Install Package](#install-package)
  - [Import Module](#import-module)
  - [Fit Text to Line](#fit-text-to-line)
    - [Fit Line Simple Usage](#fit-line-simple-usage)
    - [Creating Book Card](#creating-book-card)
    - [Changing Content Dynamically](#changing-content-dynamically)
    - [Fit Line Options](#fit-line-options)
  - [Fitting Text in the Box](#fitting-text-in-the-box)
    - [Simple Usage](#simple-usage)
    - [CMYK Colors With Fit Box Component](#cmyk-colors-with-fit-box-component)
    - [Changing Box Content Dynamically](#changing-box-content-dynamically)
    - [Fit Text Options](#fit-text-options)

## Install Package

```shell
npm i -S @pikselin/ngx-fittext
```

## Import Module

```ts
import { NgxFitTextModule } from '@pikselin/ngx-fittext';

@NgModule({
imports: [
// other modules
NgxFitTextModule
]
})
```

## Fit Text to Line

With fit-line component you can fit text to line. Every child element in this component will be fitted to line.

> **Important!**<br>
> Because of this library calculate overflow by element scrollWidth, every child element need to be full width or display block by the default. For the same reason using block elements in child elements may cause problems.

### Fit Line Simple Usage

![Fit Text](/src/assets/fit-line-simple.png "Fit Line Card")

```html
<fit-line><div>Lorem ipsum dolor sit amet.</div></fit-line>
```

### Creating Book Card

![Fit Text](/src/assets/fit-line-card.png "Fit Line Card")

```html
<fit-line>
  <div style="background-color: orange">AM<b style="color: tomato">O</b>K</div>
  <div style="background-color: teal; color: #fafafa">Stefan Zweig</div>
</fit-line>
```

### Changing Content Dynamically

![Fit Text](/src/assets/fit-line-dynamic.gif "Fit Line Dynamic")

If you will change content dynamicly you need to refresh the fit-line component. Remember that calculation function works on AfterViewInit.

- component.html

```html
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
```

- component.ts

```ts
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
```

### Fit Line Options

| Option             | Type    | Description                                                                                                            |
| ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| **[stepSize]**     | number  | When increasing or decreasing font uses stepSize. Default value is 2. Unit is getting from getComputedStyle component. |
| **[calcOnResize]** | boolean | When true component will listen window resize event and it will calculate again on resized.                            |
| **[minFontSize]**  | number  | Set minimum font size of component. If it overflow element may be multiline.                                           |
| **[maxFontSize]**  | number  | Set maximum font size of component. Default value is 500.                                                              |
| **(showInfo)**     | output  | When font resize return font size and resized element.                                                                 |

## Fitting Text in the Box

If you need to fit text into the box you could use fit-text component. fit-text component's display is flex. To align items, justify content you could use style tag. height is required params for fit-text component.

> Using line-height in style may cause vertical align problems. Please take a care when styling, if styling block calculating component wont work correctly.

### Simple Usage

![Fit Text](/src/assets/fit-text-simple.png "Fit Line Card")

```html
<mat-card class="my-3" style="width:400px">
  <fit-text height="200px" [stepSize]="1" style="align-items: center;">
    Aliquam erat volutpat. Curabitur et tincidunt nisl. Nunc non pellentesque
    erat. Ut non dignissim nunc. Aenean condimentum venenatis augue vel
    ultricies. Ut consequat egestas purus.
  </fit-text>
</mat-card>
```

### CMYK Colors With Fit Box Component

![Fit Text](/src/assets/fit-box.png "Fit Box")

```html
<div
  style="
    width: 500px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  "
>
  <fit-text
    height="250px"
    width="250px"
    style="background-color: cyan; justify-content: center; align-items: center;"
    >C</fit-text
  >
  <fit-text
    height="250px"
    width="250px"
    style="background-color: magenta;justify-content: center;align-items: center;"
    >M</fit-text
  >
  <fit-text
    height="250px"
    width="250px"
    style="background-color: yellow;justify-content: center;align-items: center;"
    >Y</fit-text
  >
  <fit-text
    height="250px"
    width="250px"
    style="background-color: black; color:#efefef;justify-content: center;align-items: center;"
    >K</fit-text
  >
</div>
```

### Changing Box Content Dynamically

![Fit Text](/src/assets/ataturk-quotes.gif "Ataturk Quotes")

As like as fit-line component if you change content dynamicly you need to refresh the fit-text component. You could do this by using ViewChild in Angular.

- component.html

```html
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
```

- component.ts

```ts
import { Component, OnInit, ViewChild } from "@angular/core";
import { FitTextComponent } from "@pikselin/ngx-fittext";
@Component({
  selector: "fit-text-hero",
  templateUrl: "./fit-text-hero.component.html",
  styleUrls: ["./fit-text-hero.component.scss"],
})
export class FitTextHeroComponent implements OnInit {
  @ViewChild("dynamicFitText") private dynamicFitText: FitTextComponent;
  readonly ataturkQuotes = [
    "Everything we see in the world is the creative work of women.",
    "Heroes who shed their blood and lost their lives! You are now lying in the soil of a friendly country. Therefore rest in peace. There is no difference between the Johnnies and Mehmets to us where they lie side by side here in this country of ours. You, the mothers, who sent their sons from far away countries wipe away your tears; your sons are now lying in our bosom and are in peace. After having lost their lives on this land they have become our sons as well.",
    "Teachers are the one and only people who save nations.",
    "Peace at Home, Peace in the World",
    "Unless a nation's life faces peril, war is murder.",
    "Our true mentor in life is science.",
    'Victory is for those who can say "Victory is mine". Success is for those who can begin saying "I will succeed" and say "I have succeeded" in the end.',
    "If one day, my words are against science, choose science.",
    "The biggest battle is the war against ignorance.",
    "My people are going to learn the principles of democracy the dictates of truth and the teachings of science. Superstition must go. Let them worship as they will, every man can follow his own conscience provided it does not interfere with sane reason or bid him act against the liberty of his fellow men.",
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
```

### Fit Text Options

| Option             | Type    | Description                                                                                                            |
| ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| **[height]**       | string  | Height is a required field that set component height.                                                                  |
| **[width]**        | string  | Width is a optional field that set component width. By default width is 100%.                                          |
| **[stepSize]**     | number  | When increasing or decreasing font uses stepSize. Default value is 2. Unit is getting from getComputedStyle component. |
| **[calcOnResize]** | boolean | When true component will listen window resize event and it will calculate again on resized.                            |
| **[minFontSize]**  | number  | Set minimum font size of component. If it overflow element may be multiline.                                           |
| **[maxFontSize]**  | number  | Set maximum font size of component. Default value is 500.                                                              |
| **(showInfo)**     | output  | When font resize return font size with unit.                                                                           |


