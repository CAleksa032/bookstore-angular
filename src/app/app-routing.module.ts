import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";
import {LibrarianComponent} from "./librarian/librarian.component";
import {authGuard} from "./guard/auth.guard";
import {BookDetailsComponent} from "./book-details/book-details.component";

const routes: Routes = [
  {path: "", component: LoginComponent, canActivate: [authGuard], data: {requiredRole: 'not_logged'}},
  {path: "user", component: UserComponent, canActivate: [authGuard], data: {requiredRole: 'user'}},
  {path: "admin", component: AdminComponent, canActivate: [authGuard], data: {requiredRole: 'admin'}},
  {path: "librarian", component: LibrarianComponent, canActivate: [authGuard], data: {requiredRole: 'librarian'}},
  {path: "bookDetails", component: BookDetailsComponent, canActivate: [authGuard], data: {requiredRole: ['librarian', 'admin', 'user']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
