import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {BookService} from "../services/book.service";
import {Book} from "../model/book";
import {Author} from "../model/author";
import {Genre} from "../model/genre";
import {Router} from "@angular/router";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit{
  constructor(private bookService: BookService, private userService: UserService, private router: Router) {
  }
  ngOnInit(): void {
    this.bookService.searchBooks('').subscribe((books: Book[]) => {
      this.books = books;
    })
    this.bookService.allAuthors().subscribe((authors: Author[]) => {
      this.authors = authors;
    })
    this.bookService.allGenres().subscribe((genres: Genre[]) => {
      this.genres = genres;
    })
  }

  bookFlag: boolean = false
  authorFlag: boolean = false
  genreFlag: boolean = false

  books: Book[]
  authors: Author[]
  genres: Genre[]

  pickedBookFlag: boolean = false
  pickedAuthorFlag: boolean = false
  pickedGenreFlag: boolean = false

  averageYearsBook: number
  averageYearsAuthor: number
  averageYearsGenre: number

  bookStats(){
    if (this.bookFlag == true) {
      this.bookFlag = false;
      this.pickedBookFlag = false;
    }
    else this.bookFlag = true;
  }

  authorStats(){
    if (this.authorFlag == true) {
      this.authorFlag = false;
      this.pickedAuthorFlag = false;
    }
    else this.authorFlag = true;
  }

  genreStats(){
    if (this.genreFlag == true) {
      this.genreFlag = false;
      this.pickedGenreFlag = false;
    }
    else this.genreFlag = true;
  }

  pickedBook(bookId: number){
    this.userService.bookStats(bookId).subscribe((response: { averageYears: number }) => {
      this.pickedBookFlag = true;
      this.averageYearsBook = response.averageYears;
    })
  }

  pickedAuthor(authorId: number) {
    this.userService.authorStats(authorId).subscribe((response: { averageYears: number}) => {
      this.pickedAuthorFlag = true;
      this.averageYearsAuthor = response.averageYears;
    })
  }

  pickedGenre(genreId: number){
    this.userService.genreStats(genreId).subscribe((response: { averageYears: number}) => {
      this.pickedGenreFlag = true;
      this.averageYearsGenre = response.averageYears;
    })
  }

  logout(){
    this.userService.logout()
    this.router.navigate(['/'])
  }
}
