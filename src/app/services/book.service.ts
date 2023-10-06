import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  uri: string = 'http://localhost:5000'

  searchBooks(searchParam: string) {
    const params = new HttpParams().set('book_name', searchParam);
    let accessToken= sessionStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)

    return this.http.get(`${this.uri}/books/`, { headers, params: params });
  }

  updateBook(bookId: number, bookTitleFromForm: string, bookDescriptionFromForm: string,
             publicationYearFromForm: string){
    const data = {
      bookTitle: bookTitleFromForm,
      bookDescription: bookDescriptionFromForm,
      publicationYear: publicationYearFromForm
    }
    let accessToken= sessionStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)

    return this.http.patch(`${this.uri}/books/${bookId}`, data, { headers });
  }
}
