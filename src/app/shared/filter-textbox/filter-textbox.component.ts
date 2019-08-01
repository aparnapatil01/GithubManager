import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'gh-filter-textbox',
  templateUrl: './filter-textbox.component.html',
  styleUrls: ['./filter-textbox.component.css']
})
export class FilterTextboxComponent implements OnInit {
  @Output()
  changed: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    fromEvent(document.getElementById('filter'), 'keyup').pipe(
      debounceTime(1000),
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value)
    ).subscribe(val => {
      this.changed.emit(val);
    });
  }
}