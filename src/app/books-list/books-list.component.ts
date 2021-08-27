import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];
  sortField = 'title';
  sortDirection = 'asc';
  isLoading = true;

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.booksService.getBooks().subscribe((books) => {
      this.books = books;
      this.isLoading = false;
    });
  }

  sortHandler(event) {
    switch (event.target.value) {
      // Sort by: Title A-Z
      case '0':
        this.sortField = 'title';
        this.sortDirection = 'asc';
        break;

      // Sort by: Title Z-A
      case '1':
        this.sortField = 'title';
        this.sortDirection = 'desc';
        break;

      // Sort by: Price Low to High
      case '2':
        this.sortField = 'price';
        this.sortDirection = 'asc';
        break;

      // Sort by: Price High to Low
      case '3':
        this.sortField = 'price';
        this.sortDirection = 'desc';
        break;
      // Sort by: Publication Date
      case '4':
        this.sortField = 'publishedDate';
        this.sortDirection = 'asc';
        break;
    }
  }
}
