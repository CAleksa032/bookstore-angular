import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { LibrarianComponent } from './librarian/librarian.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserBorrowHistoryComponent } from './user-borrow-history/user-borrow-history.component';
import { ReturnBooksComponent } from './return-books/return-books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { StatisticComponent } from './statistic/statistic.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    LibrarianComponent,
    AdminComponent,
    RegisterComponent,
    BookDetailsComponent,
    ChangePasswordComponent,
    UserBorrowHistoryComponent,
    ReturnBooksComponent,
    AddBookComponent,
    StatisticComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
