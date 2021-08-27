import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute,
    private booksService: BooksService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // const isbn = this.route.snapshot.params['id'];
    // let isbn: any;
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

    ////////////////////////////////
    // for styling only
    ////////////////////////////////
    // this.booksService.getBooks().subscribe((books: any = []) => {
    //   this.selectedBook = books.filter(
    //     (book: Book) => book.isbn === this.isbn
    //   )[0];
    // });

    // this.selectedBook = this.booksService.booksArray.filter(
    //   (book: Book) => book.isbn === this.isbn
    // )[0];
  }

  goToLink(isbn: string) {
    window.open(
      `https://www.amazon.de/gp/search?ie=UTF8&keywords=${isbn}`,
      '_blank'
    );
  }

  onEdit() {
    // this.router.navigate(['book', 'edit', this.selectedBook.isbn]);
    this.bookEditing = !this.bookEditing;
  }

  // onDelete(): void {
  //   this.booksService.deleteBook(this.selectedBook.id).subscribe(() => {
  //     this.booksService.booksArray = [];
  //     this.booksService.getBooks().subscribe(() => {
  //       this.router.navigate(['']);
  //     });
  //   });
  // }
}
