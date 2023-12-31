import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";
import {LibrarianComponent} from "./librarian/librarian.component";
import {authGuard} from "./guard/auth.guard";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {UserBorrowHistoryComponent} from "./user-borrow-history/user-borrow-history.component";
import {ReturnBooksComponent} from "./return-books/return-books.component";
import {AddBookComponent} from "./add-book/add-book.component";
import {RegisterComponent} from "./register/register.component";
import {StatisticComponent} from "./statistic/statistic.component";


const routes: Routes = [
  {path: "", component: LoginComponent, canActivate: [authGuard], data: {requiredRole: 'not_logged'}},
  {path: "user", component: UserComponent, canActivate: [authGuard],
    data: {requiredRole: ['user', 'admin', 'librarian']}},
  {path: "admin", component: AdminComponent, canActivate: [authGuard], data: {requiredRole: 'admin'}},
  {path: "librarian", component: LibrarianComponent, canActivate: [authGuard], data: {requiredRole: 'librarian'}},
  {path: "bookDetails", component: BookDetailsComponent, canActivate: [authGuard],
    data: {requiredRole: ['librarian', 'admin', 'user']}},
  {path: "changePassword", component: ChangePasswordComponent, canActivate: [authGuard],
    data: {requiredRole: ['librarian', 'user']}},
  {path: "userBorrowHistory", component: UserBorrowHistoryComponent, canActivate: [authGuard],
    data: {requiredRole: ['user', 'librarian', 'admin']}},
  {path: "returnBooks", component: ReturnBooksComponent, canActivate: [authGuard], data: {requiredRole: 'librarian'}},
  {path: "addBook", component: AddBookComponent, canActivate: [authGuard], data: {requiredRole: ['admin', 'librarian']}},
  {path: "register", component: RegisterComponent, canActivate: [authGuard],
    data: {requiredRole: ['not_logged', 'admin']}},
  {path: "statistic", component: StatisticComponent, canActivate: [authGuard], data: {requiredRole: 'librarian'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
