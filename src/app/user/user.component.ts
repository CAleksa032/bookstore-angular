import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(private userService: UserService, private router: Router) {  }

  logout(): void{
    this.userService.logout()
    this.router.navigate(['/'])
  }
}
