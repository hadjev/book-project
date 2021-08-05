import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BookApiService } from '../services/books-api.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  books: any;
  // private books: Book[] = [];

  constructor(private bookApiService: BookApiService) {}

  ngOnInit() {
    this.books = this.bookApiService
      .getBooks()
      .pipe(
        map((responseData) => {
          const booksArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              booksArray.push({ ...responseData[key], id: key });
            }
          }
          return booksArray;
        })
      )
      .subscribe((books) => {
        this.books = books;
        console.log(books);
      });
  }
}
