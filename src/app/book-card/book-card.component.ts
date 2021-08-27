import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;

  imageUrl: string;

  constructor(
    private booksService: BooksService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.imageUrl =
      'https://filedn.eu/lLxIsbSaF1YQdyIx44x9S8z/images/' +
      this.book.isbn +
      '.jpg';
  }

  goToLink(isbn: string) {
    window.open(
      `https://www.amazon.de/gp/search?ie=UTF8&keywords=${isbn}`,
      '_blank'
    );
  }

  onSelectedBook() {
    this.router.navigate(['/book', this.book.isbn]);
  }

  updateImageUrl() {
    this.imageUrl =
      'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  }
}
