import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { BookEditComponent } from './book-edit/book-edit.component';
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
    canActivate: [AuthGuard],
  },
  {
    path: 'book/edit/:isbn',
    component: BookEditComponent,
  },
  {
    path: 'book/:isbn',
    component: BookSingleItemComponent,
  },
  {
    path: 'book/edit',
    component: BookEditComponent,
  },
  { path: 'login', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
