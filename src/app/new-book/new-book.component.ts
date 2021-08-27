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
  isLoading: boolean = false;
  showSearch: boolean = true;
  showError: boolean = false;
  actualSearchIsbn: string;

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {}

  onSearchButtonClick(isbnElement: HTMLInputElement): void {
    this.isLoading = true;
    this.actualSearchIsbn = isbnElement.value;

    this.booksService.fetchNewBook(isbnElement).subscribe(
      (data) => {
        this.fetchedBook = { ...data, id: '' };

        this.isLoading = false;
      },
      (error) => {
        isbnElement.value = '';
        this.showSearch = false;
        this.isLoading = false;
      }
    );
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

  onNewSearch() {
    this.showSearch = true;
  }
}
