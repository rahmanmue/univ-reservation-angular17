import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() totalElements!:number;
  @Input() page!: number;
  @Input() size!: number;
  @Output() pageChange = new EventEmitter<number>();


  totalPages: number = 0;
  pages: number[] = [];
  maxPagesToShow: number = 5; // maximum number of pages to show at a time

  ngOnChanges() {
    this.totalPages = Math.ceil(this.totalElements / this.size);
    this.pages = this.getPagesToShow();
  }

  getPagesToShow(): number[] {
    const pagesToShow = [];
    const half = Math.floor(this.maxPagesToShow / 2);

    let start = Math.max(0, this.page - half);
    let end = Math.min(this.totalPages - 1, this.page + half);

    if (this.page - half < 0) {
      end = Math.min(this.totalPages - 1, end + (half - this.page));
    }
    if (this.page + half > this.totalPages - 1) {
      start = Math.max(0, start - (this.page + half - this.totalPages + 1));
    }

    for (let i = start; i <= end; i++) {
      pagesToShow.push(i);
    }

    return pagesToShow;
  }

  setPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.pages = this.getPagesToShow();
      this.pageChange.emit(this.page);
    }
  }
}
