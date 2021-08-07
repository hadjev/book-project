import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css'],
})
export class NewBookComponent implements OnInit {
  fetchedBook: Book;

  constructor(private bookApiService: BooksService) {}

  ngOnInit(): void {}

  onSearchButtonClick(isbn: HTMLInputElement): void {
    this.bookApiService.fetchNewBook(isbn).subscribe((data) => {
      this.fetchedBook = data;
    });
  }

  onSaveBook(form: NgForm): void {
    this.fetchedBook.price = form.value.price;
    this.fetchedBook.type = form.value.type;
    this.bookApiService.postNewBook(this.fetchedBook);

    // form.reset();
  }

  onPriceChange(event) {
    this.fetchedBook.price = Number(event.target.value);
  }

  onBookTypeChange(event) {
    this.fetchedBook.type = event.target.value;
  }
}
