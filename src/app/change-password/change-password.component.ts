import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "../model/user";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  constructor(private router: Router, private userService: UserService) {
  }
  ngOnInit(): void {
  }

  oldPassword: string
  newPassword: string
  confirmedPassword: string

  changePassword(){
    if (this.newPassword != this.confirmedPassword) {
      alert('Passwords are not same!');
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmedPassword = '';
    } else {
      this.userService.changePassword(this.oldPassword, this.newPassword).subscribe((user: User) => {
        this.userService.logout();
        this.router.navigate([""]);
      })
    }
  }
}
