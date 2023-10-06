import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../services/book.service";
import {Book} from "../model/book";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{

  constructor( private route: ActivatedRoute, private bookService: BookService, private userService: UserService) {
  }
  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('param');
    this.bookService.searchBooks(this.title).subscribe((bookFromDB: Book[]) => {
      this.book = bookFromDB[0];
      console.log(this.book);
      this.form = new FormGroup({
        bookTitle: new FormControl(this.book.bookTitle),
        bookDescription: new FormControl(this.book.bookDescription),
        publicationYear: new FormControl(this.book.publicationYear)
      })
    })
  }

  title: string
  book: Book
  form: FormGroup

  borrow(){
    this.userService.borrow(this.book.bookId).subscribe((borrowedBook: Book) => {
      alert("Successfully borrowed book")
    })
  }

  updateBook(){
    this.bookService.updateBook(this.book.bookId, this.form.value.bookTitle,
        this.form.value.bookDescription, this.form.value.publicationYear).subscribe((updatedBook: Book) => {

    })
  }

}
