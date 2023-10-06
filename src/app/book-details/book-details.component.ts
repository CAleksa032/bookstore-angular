import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor( private route: ActivatedRoute, private bookService: BookService, private userService: UserService,
               private router: Router) {
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
    this.userRole = sessionStorage.getItem('role');
  }

  title: string
  book: Book
  form: FormGroup
  userRole: string

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

  returnBack(){
    const userRole = sessionStorage.getItem('role');
    if (userRole === 'user') {
      this.router.navigate(["/user"]);
    } else if (userRole === 'admin') {
      this.router.navigate(["/admin"]);
    } else {
      this.router.navigate(["/librarian"]);
    }
  }

}
