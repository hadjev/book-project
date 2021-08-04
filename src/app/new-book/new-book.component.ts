import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../models/book.model';
import { NewBookApiService } from '../services/new-book-api.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css'],
})
export class NewBookComponent implements OnInit {
  fetchedBook: Book;

  constructor(private newBookService: NewBookApiService) {}

  ngOnInit(): void {}

  onSearchButtonClick(isbn: HTMLInputElement): void {
    this.newBookService.fetchBook(isbn).subscribe((data) => {
      this.fetchedBook = data;
    });
  }

  onSubmit(form: NgForm): void {
    form.reset();
  }
}
