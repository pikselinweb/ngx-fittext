import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { NgxFitTextModule } from '@pikselin/ngx-fittext';

import { MaterialModule } from './shared';
import { AppComponent } from './app.component';
import { NavbarComponent, FittextArticleComponent } from './components';
import {
  FitLineHeroComponent,
  NgxInstallationComponent,
  FitLineGuideComponent,
  FitTextHeroComponent,
  FitTextGuideComponent,
} from './contents';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FitLineHeroComponent,
    FittextArticleComponent,
    NgxInstallationComponent,
    FitLineGuideComponent,
    FitTextHeroComponent,
    FitTextGuideComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HighlightModule,
    NgxFitTextModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),

        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
