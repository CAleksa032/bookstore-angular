import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {BookDetailsComponent} from "./book-details/book-details.component";

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "user", component: UserComponent},
  {path: "bookDetails", component: BookDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
