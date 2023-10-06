import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {User} from "../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username!: string;
  password!: string;
  message!: string;

  /*login(){
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{

    })
  }*/
  login(){

  }


}
