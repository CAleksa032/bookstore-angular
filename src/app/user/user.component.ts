import {UserService} from "../services/user.service";
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BookService} from "../services/book.service";
import {Book} from "../model/book";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit{

  constructor(private userService: UserService, private router: Router, private bookService: BookService) {
  }
  ngOnInit(): void {
    this.bookService.searchBooks('').subscribe((books: Book[]) => {
      this.bookOfTheDay = books[(new Date().getFullYear() + new Date().getMonth() + new Date().getDay()) % books.length]
    })
  }
  searchTerm: string = ''
  books: Book[]
  bookOfTheDay: Book

  search(){
    this.bookService.searchBooks(this.searchTerm).subscribe((booksFromDB: Book[]) => {
      this.books = booksFromDB
    });
  }

  bookDetails(book){
    this.router.navigate(['bookDetails', {param: book.bookTitle}]);
  }

  changePassword(){
    this.router.navigate(['changePassword']);
  }

  logout(): void{
    this.userService.logout()
    this.router.navigate(['/'])
  }
}
