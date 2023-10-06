import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
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

  username: string;
  password: string;
  message: string;

  login() {
    this.userService.login(this.username, this.password).pipe(
      catchError((error) => {
        if (error.status === 404) {
          this.message = 'Wrong username or password';
        }
        return of(null); // Return an observable with null value to continue the chain
      })
    )
      .subscribe((response) => {
        if (response) {
          const accessToken = response['access_token'];
          const refreshToken = response['refresh_token'];
          console.log(accessToken)
          // Store tokens in session storage
          sessionStorage.setItem('access_token', accessToken);
          sessionStorage.setItem('refresh_token', refreshToken);

          // Fetch user role
          this.userService.fetchUserRole().subscribe(
            (roleResponse) => {
              const userRole = roleResponse['role'];
              sessionStorage.setItem('role', userRole)
              // Redirect based on user role
              if (userRole === 'admin') {
                this.router.navigate(['/admin']);
              } else if (userRole === 'librarian') {
                this.router.navigate(['/librarian']);
              } else {
                this.router.navigate(['/user']);
              }
            }
          );
        }
      }
    );
  }


}
