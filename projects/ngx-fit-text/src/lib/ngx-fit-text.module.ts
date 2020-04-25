import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextResizeComponent, NgxFitTextComponent } from './components';

@NgModule({
  declarations: [NgxFitTextComponent, TextResizeComponent],
  imports: [CommonModule],
  exports: [NgxFitTextComponent, TextResizeComponent],
})
export class NgxFitTextModule {}
