import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role')
  }
  constructor(private userService: UserService,  private router: Router) {}

  userRole: string

  username: string;
  password: string;
  confirmPassword: string;

  email: string;

  type: string;

  message: string;

  submitForm(form: NgForm) {
    this.register();
  }


  register(){
    if(sessionStorage.length == 0){
      this.userService.registerUser(this.username, this.password, this.email).subscribe( (respObj) =>{
          console.log(respObj)
          alert('User added. Redirecting to login page')
          this.router.navigate(['/'])
        }, (error) =>{
          console.log(error)
          if (error.status == 409) {
            this.message = "Username or Email already taken"
          }
        }
      );
    }else{
      this.userService.registerLibrarian(this.username, this.password, this.email).subscribe( (respObj) =>{
          console.log(respObj)
          alert('Librarian added. Redirecting to home page')
          this.router.navigate(['/user'])
        }, (error) =>{
          console.log(error)
          if (error.status == 409) {
            this.message = "Username or Email already taken"
          }
        }
      );
    }
  }


  isPasswordValid() {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z][\w.@$!%*#?&]{6,11}$/;
    //return passwordPattern.test(this.password);
    return true
  }

  isFormValid(): boolean {
    return this.isPasswordValid() && !this.passwordsDontMatch() ;
  }

  passwordsDontMatch(): boolean {
    return !(this.password === this.confirmPassword)
  }

}
