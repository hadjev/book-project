import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewBookApiService {
  private baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
  fetchedBook;

  test = new Subject<string>();
  newBook = new AsyncSubject();

  constructor(private http: HttpClient) {}

  // 9783426780428 Simplify
  // 9783893400614 Hobsbawm
  // 9783596191154 Der Gewaehlte
  // 9783423214124 Der Hobbit

  fetchBook(isbn: HTMLInputElement) {
    return this.http.get(this.baseUrl + isbn.value).pipe(
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
          type: '',
        };
      })
    );
  }
}
