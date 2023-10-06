import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:5000'


  login(usernameFromForm: string, passwordFromForm: string){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post(`${this.uri}/users/login`, data)
  }

  borrow(bookId: number){
    return this.http.post(`${this.uri}/users/borrow/${bookId}`, null);
  }
}
