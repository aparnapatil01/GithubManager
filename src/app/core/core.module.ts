import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { SorterService } from './services/sorter.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ DataService, SorterService ]
})
export class CoreModule { }
