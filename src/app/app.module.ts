import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthComponent } from './auth/auth.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookSingleItemComponent } from './book-single-item/book-single-item.component';
import { BooksListComponent } from './books-list/books-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewBookComponent } from './new-book/new-book.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { SortByPipe } from './pipes/sort-by.pipe';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BooksListComponent,
    NewBookComponent,
    BookCardComponent,
    BookSingleItemComponent,
    BookEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    SortByPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
