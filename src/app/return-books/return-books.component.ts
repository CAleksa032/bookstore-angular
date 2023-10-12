import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../model/user";
import {BorrowedBook} from "../model/borrowedBook";

@Component({
  selector: 'app-return-books',
  templateUrl: './return-books.component.html',
  styleUrls: ['./return-books.component.css']
})
export class ReturnBooksComponent implements OnInit {
  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.allUsers().subscribe((users: User[]) => {
      this.users = users;
    })
    this.userRole = sessionStorage.getItem('role');
  }

  userRole: string
  users: User[]
  borrowedBooks: BorrowedBook[]
  picked: boolean
  userId: number
  selectedBooks: { [id: number]: boolean } = {};

  pickedUserBooks(id: number){
    this.selectedBooks= {}
    this.userService.borrowedBooks(id).subscribe((borrowedBooks: BorrowedBook[]) => {
      this.borrowedBooks = borrowedBooks;
      this.picked = true;
      this.userId = id;
    })
  }

  returnSelectedBooks(){
    const selectedIds: number[] = Object.keys(this.selectedBooks)
        .filter(id => this.selectedBooks[id])
        .map(id => parseInt(id, 10)); // Eksplicitna konverzija u brojeve
    this.userService.returnBooks(selectedIds, this.userId).subscribe((borrowedBooks: BorrowedBook[]) => {
      this.picked = false;
      this.ngOnInit();
    })
  }
}
