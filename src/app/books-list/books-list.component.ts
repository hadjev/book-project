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
  imageLink: string;
  isLoading = true;

  // private books: Book[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    if (!this.booksService.booksArray) {
      this.booksService.getBooks().subscribe((books) => {
        this.books = books;
        this.isLoading = false;
      });
    } else {
      this.books = this.booksService.booksArray;
      this.isLoading = false;
    }

    // this.booksService.getBooks().subscribe((books) => {
    //   this.books = books;
    // });
  }
}
