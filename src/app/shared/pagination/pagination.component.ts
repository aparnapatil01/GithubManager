import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gh-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  private pagerTotalItems: number;
  private pagerPageSize: number;

  totalPages: number;
  pages: number[] = [];
  currentPage = 1;
  isVisible = false;
  previousEnabled = false;
  nextEnabled = true;

  constructor() { }

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  @Input() get pageSize(): number {
    return this.pagerPageSize;
  }

  set pageSize(size: number) {
    this.pagerPageSize = size;
    this.update();
  }

  @Input() get totalItems(): number {
    return this.pagerTotalItems;
  }

  set totalItems(itemCount: number) {
    this.pagerTotalItems = itemCount;
    this.update();
  }

  update() {
    if(this.pagerTotalItems && this.pagerPageSize) {
      this.totalPages = Math.ceil(this.pagerTotalItems/this.pageSize);
      this.isVisible = true;
      if(this.totalItems >= this.pageSize) {
        for(let i = 1; i < this.totalPages + 1; i++) {
          this.pages.push(i);
        }
      }
      return;
    }

    this.isVisible = false;
  }

  changePage(page: number, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    if (this.currentPage === page) { return; }
    this.currentPage = page;
    this.pageChanged.emit(page);	
  }

  ngOnInit() {
  }

}