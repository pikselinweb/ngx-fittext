import { NgModule } from '@angular/core';
import { NgxFittextComponent } from './ngx-fittext.component';
import { FitLineComponent } from './components/fit-line/fit-line.component';
import { FitTextComponent } from './components/fit-text/fit-text.component';



@NgModule({
  declarations: [
    NgxFittextComponent,
    FitLineComponent,
    FitTextComponent
  ],
  imports: [
  ],
  exports: [
    NgxFittextComponent,
    FitLineComponent,
    FitTextComponent
  ]
})
export class NgxFitTextModule { }
