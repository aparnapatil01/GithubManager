import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { FilterTextboxComponent } from './filter-textbox/filter-textbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [FormsModule, FilterTextboxComponent],
  declarations: [FilterTextboxComponent]
})
export class SharedModule { }