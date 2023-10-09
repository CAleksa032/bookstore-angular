import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {BorrowedBook} from "../model/borrowedBook";
import {User} from "../model/user";

@Component({
  selector: 'app-user-borrow-history',
  templateUrl: './user-borrow-history.component.html',
  styleUrls: ['./user-borrow-history.component.css']
})
export class UserBorrowHistoryComponent implements OnInit{

  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.fetchUserId().subscribe((idResponse) => {
      this.id = idResponse['id'];
      this.userService.userHistory(this.id).subscribe((borrowedBooksFromDB: BorrowedBook[]) => {
        this.borrowedBooks = borrowedBooksFromDB;
      })
    })
    this.userRole = sessionStorage.getItem('role')
    if (this.userRole != 'user'){
      this.userService.allUsers().subscribe((users: User[]) => {
        this.users = users;
      })
    }

  }

  id: number;
  borrowedBooks: BorrowedBook[];
  userRole: string;
  users: User[]
  picked: boolean = false;

  pickedUserHistory(id: number){
    this.userService.userHistory(id).subscribe((borrowedBooksFromDB: BorrowedBook[]) => {
      this.borrowedBooks = borrowedBooksFromDB;
      this.picked = true;
    })
  }
}
