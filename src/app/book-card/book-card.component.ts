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

  constructor(private newBookService: BookApiService) {}

  ngOnInit(): void {
    this.newBookService.newBook.subscribe((data) => {
      console.log(data);
    });
  }
}
