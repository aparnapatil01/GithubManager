import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTextboxComponent } from './filter-textbox/filter-textbox.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [FilterTextboxComponent],
  declarations: [FilterTextboxComponent]
})
export class SharedModule { }