import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaginationModule } from './pagination/pagination.module';

import { FilterTextboxComponent } from './filter-textbox/filter-textbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule
  ],
  exports: [FormsModule, PaginationModule, FilterTextboxComponent],
  declarations: [FilterTextboxComponent]
})
export class SharedModule { }