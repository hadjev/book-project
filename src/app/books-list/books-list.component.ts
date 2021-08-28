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
    const commands = event.target.value.split(' ');

    this.sortField = commands[0];
    this.sortDirection = commands[1];
  }
}
