import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

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
      this.authService.saveToken(data['token'])});
      this.router.navigate(['/'])
  }
  
  get username(){
    return this.loginForm.get('username')
  }
  
  get password(){
    return this.loginForm.get('password')
  }
}
