import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Book} from "../model/book";
import {Author} from "../model/author";
import {Genre} from "../model/genre";
import {BookService} from "../services/book.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit{
  constructor(private bookService: BookService, private userService: UserService, private router: Router) {
  }
  ngOnInit(): void {
    this.bookService.allAuthors().subscribe((authors: Author[]) => {
      this.authors = authors;
    })
    this.bookService.allGenres().subscribe((genres: Genre[]) => {
      this.genres = genres;
    })
    this.form = new FormGroup({
      bookTitle: new FormControl(),
      bookDescription: new FormControl(),
      publicationYear: new FormControl(),
      bookAuthors: new FormControl(),
      bookGenres: new FormControl()
    })


  }

  form: FormGroup
  book: Book
  authors: Author[]
  genres: Genre[]

  addBook(){
    this.bookService.addBook(this.form.value.bookTitle, this.form.value.bookAuthors, this.form.value.publicationYear,
        this.form.value.bookDescription, this.form.value.bookGenres).subscribe((respObj) => {
        alert("Book successfully added!");
    })
  }

  logout(){
    this.userService.logout()
    this.router.navigate(['/'])
  }
}
