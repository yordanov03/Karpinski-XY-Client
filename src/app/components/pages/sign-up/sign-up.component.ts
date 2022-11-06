import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      'username':['', Validators.required],
      'email':['', [Validators.required, Validators.email]],
      'password':['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  register(){
    return this.authService.register(this.registerForm.value).subscribe(
      {
        next: data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: err => {
          this.errorMessage = err.error[0].description;
          this.isSignUpFailed = true;
        }
      }
    )
  }

  get username(){
    return this.registerForm.get('username');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }

}
