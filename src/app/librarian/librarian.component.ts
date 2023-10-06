import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-librarian',
  templateUrl: './librarian.component.html',
  styleUrls: ['./librarian.component.css']
})
export class LibrarianComponent {
  constructor(private userService: UserService, private router: Router) {  }

  logout(): void{
    this.userService.logout()
    this.router.navigate(['/'])
  }
}
