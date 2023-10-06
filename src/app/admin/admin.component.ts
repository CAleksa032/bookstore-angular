import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private userService: UserService, private router: Router) {  }

  logout(): void{
    this.userService.logout().subscribe((response)=>(
      this.router.navigate(['/'])
    ))
  }
}
