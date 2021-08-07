import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookSingleItemComponent } from './book-single-item/book-single-item.component';
import { BooksListComponent } from './books-list/books-list.component';
import { NewBookComponent } from './new-book/new-book.component';

const appRoutes: Routes = [
  {
    path: '',
    component: BooksListComponent,
  },
  {
    path: 'new',
    component: NewBookComponent,
  },
  {
    path: 'book/:isbn',
    component: BookSingleItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
