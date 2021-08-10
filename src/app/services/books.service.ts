import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private fetchUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
  private firebaseUrl =
    'https://ng-book-project-95f68-default-rtdb.europe-west1.firebasedatabase.app/';

  booksArray: Book[] = [];

  constructor(private http: HttpClient) {}

  // 9783426780428 Simplify
  // 9783893400614 Hobsbawm
  // 9783596191154 Der Gewaehlte
  // 9783423214124 Der Hobbit

  fetchNewBook(isbn: HTMLInputElement) {
    return this.http.get(this.fetchUrl + isbn.value).pipe(
      map((data: any) => {
        const bookBaseUrl = data.items[0];
        let author: string = '';
        let authors: string = '';

        // Check if one or more authors
        if (bookBaseUrl.volumeInfo.authors.length > 1) {
          authors = bookBaseUrl.volumeInfo.authors.join(', ');
        } else {
          author = bookBaseUrl.volumeInfo.authors[0];
        }

        return {
          author: author,
          authors: authors,
          content: bookBaseUrl.searchInfo?.textSnippet ?? 'kein Text',
          imgLink: bookBaseUrl.volumeInfo.imageLinks.thumbnail,
          isbn: bookBaseUrl.volumeInfo.industryIdentifiers[1].identifier,
          pageCount: bookBaseUrl.volumeInfo.pageCount,
          publischedDate: bookBaseUrl.volumeInfo.publishedDate,
          subtitle: bookBaseUrl.volumeInfo.subtitle,
          title: bookBaseUrl.volumeInfo.title,
          price: 0,
          sold: false,
          type: 'please choose a book type',
        };
      })
    );
  }

  getBooks() {
    this.booksArray = [];
    return this.http.get(`${this.firebaseUrl}books.json`).pipe(
      map((responseData) => {
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            this.booksArray.push({ ...responseData[key], id: key });
          }
        }
        return this.booksArray;
      })
    );
  }

  getSingleBook(isbn: string): Book {
    return this.booksArray.filter((book: Book) => book.isbn === isbn)[0];
  }

  postNewBook(bookData: Book) {
    return this.http.post(`${this.firebaseUrl}books.json`, bookData);
  }

  deleteBook(id: string) {
    this.booksArray = [];

    return this.http.delete(
      `https://ng-book-project-95f68-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`
    );
  }

  updateBook(id: string, bookData: any) {
    this.booksArray = [];

    return this.http.patch(`${this.firebaseUrl}books/${id}.json`, bookData);
  }
}
