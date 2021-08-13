import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css'],
})
export class NewBookComponent implements OnInit {
  fetchedBook: Book;
  imageLink: string;
  isLoading = false;

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {}

  onSearchButtonClick(isbn: HTMLInputElement): void {
    this.isLoading = true;

    this.booksService.fetchNewBook(isbn).subscribe((data) => {
      console.log(data);

      this.fetchedBook = { ...data, id: '' };
      this.imageLink = data.imgLink;

      this.isLoading = false;
    });
  }

  onSaveBook(form: NgForm): void {
    this.fetchedBook.price = form.value.price;
    this.fetchedBook.type = form.value.type;

    this.booksService.postNewBook(this.fetchedBook).subscribe(() => {
      this.booksService.getBooks().subscribe(() => {
        // form.reset();
        this.router.navigate(['/book', this.fetchedBook.isbn]);
      });
    });
  }

  onPriceChange(event) {
    this.fetchedBook.price = Number(event.target.value);
  }

  onBookTypeChange(event) {
    this.fetchedBook.type = event.target.value;
  }
}
