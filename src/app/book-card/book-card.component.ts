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

  onSelectedBook() {
    this.router.navigate(['/book', this.book.isbn]);
  }
}
