import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-single-item',
  templateUrl: './book-single-item.component.html',
  styleUrls: ['./book-single-item.component.css'],
})
export class BookSingleItemComponent implements OnInit {
  selectedBook: Book;
  isbn: string;
  bookEditing: boolean = false;
  isUserLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.isbn = params['isbn'];
    });

    if (!this.booksService.booksArray) {
      this.booksService.getBooks().subscribe((books) => {
        this.selectedBook = this.booksService.getSingleBook(this.isbn);
      });
    }

    this.authService.user.subscribe((user) => {
      if (user) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
    });

    this.selectedBook = this.booksService.getSingleBook(this.isbn);
  }

  goToLink(isbn: string) {
    window.open(
      `https://www.amazon.de/gp/search?ie=UTF8&keywords=${isbn}`,
      '_blank'
    );
  }

  onEdit() {
    this.bookEditing = !this.bookEditing;
  }
}
