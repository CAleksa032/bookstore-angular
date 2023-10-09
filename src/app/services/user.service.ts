import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:5000'


  login(username: string, password: string){
    const loginData = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/login`, loginData)
  }

  fetchUserRole(){
    let accessToken= sessionStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get(`${this.uri}/role`, { headers });
  }

  logout() {
    let accessToken= sessionStorage.getItem('access_token')
    sessionStorage.clear();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete(`${this.uri}/logout`, { headers });
  }

  borrow(bookId: number){
    return this.http.post(`${this.uri}/users/borrow/${bookId}`, null);
  }

  registerUser(username, password, email){
    const registerData = {
      username: username,
      password: password,
      email: email
    }

    return this.http.post(`${this.uri}/register`, registerData);
  }
  registerLibrarian(username, password, email){
    const registerData = {
      username: username,
      password: password,
      email: email
    }
    let accessToken= sessionStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.post(`${this.uri}/users/register`, registerData,{headers});
  }
a
}
