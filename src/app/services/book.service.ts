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

  allAuthors(){
    let accessToken= sessionStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    return this.http.get(`${this.uri}/authors/`, { headers });
  }

  allGenres(){
    let accessToken= sessionStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    return this.http.get(`${this.uri}/genres/`, { headers });
  }

  addBook(title: string, authors: number[], year: string, description: string, genres: number[]){
    let accessToken= sessionStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)

    const authorIdArray = Array.isArray(authors) ? authors : [authors];
    const genreIdArray = Array.isArray(genres) ? genres : [genres];

    const data = {
      bookTitle: title,
      bookDescription: description,
      publicationYear: year,
      authors: authorIdArray.map(id => ({ authorId: id })),
      genres: genreIdArray.map(id => ({genreId: id}))
    }
    return this.http.post(`${this.uri}/books/`, data, { headers });
  }

}
