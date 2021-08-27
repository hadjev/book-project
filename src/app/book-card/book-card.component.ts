import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;

  imageUrl: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToLink(isbn: string) {
    window.open(
      `https://www.amazon.de/gp/search?ie=UTF8&keywords=${isbn}`,
      '_blank'
    );
  }

  onSelectedBook() {
    this.router.navigate(['/book', this.book.isbn]);
  }
}
