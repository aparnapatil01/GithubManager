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
  maxPages: number = 5;
  start: number;
  end: number;

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
    if (this.pagerTotalItems && this.pagerPageSize) {
      this.totalPages = Math.ceil(this.pagerTotalItems / this.pageSize);
      this.isVisible = true;
      this.createUpdatePage(1);
      return;
    }

    this.isVisible = false;
  }

  createUpdatePage(page: number) {
    this.currentPage = page;
    if (this.totalPages <= this.maxPages) {
      this.start = 1;
      this.end = this.totalPages;
    } else {
      let maxPagesBeforeCurrentPage = Math.floor(this.maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(this.maxPages / 2) - 1;
      if (this.currentPage <= maxPagesBeforeCurrentPage) {
        this.start = 1;
        this.end = this.maxPages;
      } else if (this.currentPage + maxPagesAfterCurrentPage >= this.totalPages) {
        this.start = this.totalPages - this.maxPages + 1;
        this.end = this.totalPages;
      } else {
        this.start = this.currentPage - maxPagesBeforeCurrentPage;
        this.end = this.currentPage + maxPagesAfterCurrentPage;
      }
    }
    this.pages = [];

    for (let i = this.start; i <= this.end; i++) {
      this.pages.push(i);
    }
  }

  changePage(page: number, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    if (this.currentPage === page) { return; }
    this.currentPage = page;
    this.createUpdatePage(page);
    this.previousEnabled = this.currentPage > 1;
    this.nextEnabled = this.currentPage < this.totalPages;
    this.pageChanged.emit(page);
  }

  previousNext(direction: number) {
    let page: number = this.currentPage;
    if (direction == -1) {
      if (page > 1) { page--; }
    } else {
      if (page < this.totalPages) { page++; }
    }
    this.changePage(page);
  }

  firstLast(flag) {
    let page = this.currentPage;
    if (flag == 1) {
      if (page !== 1) { page = 1; }
    } else {
      if (page != this.totalPages) { page = this.totalPages };
    }
    this.changePage(page);
  }

  ngOnInit() {
  }

}