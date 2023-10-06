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

  constructor(private router: Router, private bookService: BookService) {
  }
  ngOnInit(): void {

  }
  searchTerm: string = ''
  books: Book[]

  search(){
    this.bookService.searchBooks(this.searchTerm).subscribe((booksFromDB: Book[]) => {
      this.books = booksFromDB
    });
  }

  bookDetails(book){
    this.router.navigate(['bookDetails', {param: book.bookTitle}]);
  }

}
