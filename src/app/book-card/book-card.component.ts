import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BookApiService } from '../services/books-api.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;

  constructor(private bookApiService: BookApiService) {}

  ngOnInit(): void {
    this.bookApiService.newBook.subscribe((data) => {
      console.log(data);
    });
  }

  goToLink(isbn) {
    window.open(
      `https://www.amazon.de/gp/search?ie=UTF8&keywords=${isbn}`,
      '_blank'
    );
  }
}
