import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxFitTextModule } from 'ngx-fit-text';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HighlightPlusModule } from 'ngx-highlightjs/plus';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxFitTextModule,
    BrowserAnimationsModule,
    HighlightPlusModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
