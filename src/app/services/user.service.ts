import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  fetchUserId(){
    let accessToken= sessionStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get(`${this.uri}/id`, { headers });
  }

  logout() {
    let accessToken= sessionStorage.getItem('access_token')
    sessionStorage.clear();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete(`${this.uri}/logout`, { headers });
  }

  borrow(bookId: number){
    let accessToken= sessionStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    return this.http.post(`${this.uri}/users/borrow/${bookId}`, { headers });
  }

  changePassword(oldPassword: string, newPassword: string){
    let accessToken= sessionStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    const data = {
      oldPassword: oldPassword,
      password: newPassword
    }
    return this.http.patch(`${this.uri}/users/password`, data, { headers })
  }

  userHistory(userId: number){
    let accessToken= sessionStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get(`${this.uri}/users/user/${userId}`, { headers });
  }

  allUsers() {
    let accessToken= sessionStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get(`${this.uri}/users/all`, { headers});
  }
}
