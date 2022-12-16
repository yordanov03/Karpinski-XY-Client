import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { popoverMessage } from 'src/app/shared/popover-messages';
import { AuthService } from 'src/app/_services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn = false;
  isLogInSuccessful = false;
  isLoginFailed = false;
  errorMessage = '';
  serverResponse;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router) {
      this.loginForm = this.fb.group({
        'username':['', [Validators.required, Validators.email]],
        'password':['', Validators.required]
        })
     }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.loginForm.value).subscribe(data =>{
      // this.isLogInSuccessful = true;
      // this.authService.saveUserInfo(data);
      setTimeout(() => {
        this.isLogInSuccessful = true
        this.authService.saveUserInfo(data);
        popoverMessage().fire({
          icon:"success",
          text:"Hello, my love"
        })
        setTimeout(() => {
          this.router.navigate([""])
          this.isLogInSuccessful = true
        }, 2000);
      }, 1000)
    },
      err => {
        this.errorMessage = "Could not log you in"
        this.isLoginFailed = true;
        this.isLogInSuccessful = false;
        this.authService.clearUserInfo();
        setTimeout(() => {
          this.errorMessage = "";
          this.isLoginFailed = false;
        }, 2000);
        return;
      }
      );

  }
  
  get username(){
    return this.loginForm.get('username')
  }
  
  get password(){
    return this.loginForm.get('password')
  }
}
