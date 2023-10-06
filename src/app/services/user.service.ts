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

  logout() {
    let accessToken= sessionStorage.getItem('access_token')
    sessionStorage.clear();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete(`${this.uri}/logout`, { headers });
  }


}
