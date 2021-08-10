import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  bookEditing: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    // const isbn = this.route.snapshot.params['id'];
    // let isbn: any;
    this.route.params.subscribe((params: Params) => {
      this.isbn = params['isbn'];
    });

    // this.selectedBook = this.booksService.getSingleBook(this.isbn);

    ////////////////////////////////
    // for styling only
    ////////////////////////////////
    this.booksService.getBooks().subscribe((books: any = []) => {
      this.selectedBook = books.filter(
        (book: Book) => book.isbn === this.isbn
      )[0];
    });

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
    this.bookEditing = !this.bookEditing;
  }

  // onDelete(): void {
  //   this.booksService.deleteBook(this.selectedBook.id).subscribe(() => {
  //     console.log('success delete');
  //     this.booksService.booksArray = [];
  //     this.booksService.getBooks().subscribe(() => {
  //       console.log('success getBooks');
  //       this.router.navigate(['']);
  //     });
  //   });
  // }
}
