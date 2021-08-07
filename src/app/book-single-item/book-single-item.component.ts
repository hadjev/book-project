import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-single-item',
  templateUrl: './book-single-item.component.html',
  styleUrls: ['./book-single-item.component.css'],
})
export class BookSingleItemComponent implements OnInit {
  selectedBook: Book;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    // const isbn = this.route.snapshot.params['id'];
    let isbn: any;
    this.route.params.subscribe((params: Params) => {
      isbn = params['isbn'];
    });

    this.selectedBook = this.booksService.getSingleBook(isbn);

    ////////////////////////////////
    // temporarily for the styling of the element
    ////////////////////////////////
    // this.booksService.getBooks().subscribe((books: any = []) => {
    //   this.selectedBook = books.filter((book: Book) => book.isbn === isbn)[0];
    //   console.log(this.selectedBook);
    // });
  }

  goToLink(isbn: string) {
    window.open(
      `https://www.amazon.de/gp/search?ie=UTF8&keywords=${isbn}`,
      '_blank'
    );
  }
}
