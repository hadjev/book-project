import { Component, OnInit } from '@angular/core';
import { BookApiService } from '../services/books-api.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  books: any = [];
  // private books: Book[] = [];

  constructor(private bookApiService: BookApiService) {}

  ngOnInit() {
    this.bookApiService.getBooks().subscribe((books: any = []) => {
      this.books = books;
    });

    // this.books = this.bookApiService
    //   .getBooks()
    //   .pipe(
    //     map((responseData) => {
    //       const booksArray: Book[] = [];
    //       for (const key in responseData) {
    //         if (responseData.hasOwnProperty(key)) {
    //           booksArray.push({ ...responseData[key], id: key });
    //         }
    //       }
    //       return booksArray;
    //     })
    //   )
    //   .subscribe((books) => {
    //     this.books = books;
    //     console.log('all books:' + this.books);
    //   });
  }
}
