import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit {
  @Input() book: Book;
  updatedBook: Book;

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {}

  onDelete(bookTitle: string): void {
    if (confirm(`Delete "${bookTitle}"?`)) {
      this.booksService.deleteBook(this.book.id).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['']);
  }

  // Update book
  onSubmit(form: HTMLFormElement) {
    let tempBookArray: any = [];
    tempBookArray = form.value;

    this.updatedBook = tempBookArray;

    this.booksService.updateBook(this.book.id, tempBookArray).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
