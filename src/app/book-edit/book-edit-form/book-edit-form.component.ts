import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-edit-form',
  templateUrl: './book-edit-form.component.html',
  styleUrls: ['./book-edit-form.component.css'],
})
export class BookEditFormComponent implements OnInit {
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

  onSubmit(form: HTMLFormElement) {
    let tempBookArray: any = [];
    tempBookArray = form.value;

    // Check for AUTHOR and add them
    if (!tempBookArray.author) {
      tempBookArray.author = '';
    }
    // Check for AUTHORS and add them
    if (!tempBookArray.authors) {
      tempBookArray.authors = '';
    }

    this.updatedBook = tempBookArray;

    this.booksService.updateBook(this.book.id, tempBookArray).subscribe(() => {
      this.router.navigate(['']);
      // this.router.navigate(['book', 'edit', this.book.isbn]);
    });
  }
}
