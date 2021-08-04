import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../models/book.model';
import { BookApiService } from '../services/books-api.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css'],
})
export class NewBookComponent implements OnInit {
  fetchedBook: Book;

  constructor(private bookApiService: BookApiService) {}

  ngOnInit(): void {}

  onSearchButtonClick(isbn: HTMLInputElement): void {
    this.bookApiService.fetchNewBook(isbn).subscribe((data) => {
      this.fetchedBook = data;
    });
  }

  onSaveBook(form: NgForm): void {
    this.fetchedBook.price = form.value.price;
    this.fetchedBook.type = form.value.type;
    console.log(this.fetchedBook);
    this.bookApiService.postNewBook(this.fetchedBook);

    // form.reset();
  }

  test() {
    this.bookApiService.getBooks();
  }
}
