import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { matchValidator } from 'src/app/shared/form-validator';
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
      'username':['', [Validators.required, Validators.minLength(3)]],
      'email':['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.minLength(4), matchValidator('confirmPassword', true)]],
        'confirmPassword': ['', [Validators.required, matchValidator('password')] ]
    })
   }

  ngOnInit(): void {
  }

  // register(){
  //   return this.authService.register(this.registerForm.value).subscribe(
  //     {
  //       next: data => {
  //         console.log(data);
  //         this.isSuccessful = true;
  //         this.isSignUpFailed = false;
  //       },
  //       error: err => {
  //         this.errorMessage = err.error;
  //         this.isSignUpFailed = true;
  //         console.log(err)
  //       }
  //     }
  //   )
  // }

  register(){
    return this.authService.register(this.registerForm.value).subscribe(
      (res: any) => {
        console.log(res)
        if (res.succeeded) {
          this.registerForm.reset();
          this.isSuccessful = true;
          console.log(res)
        } else {
          this.isSignUpFailed = true;
          this.errorMessage = res.errors[0].description
        }
      },
      err => {
        console.log(err);
        console.log("err")
      }
    );
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

  get confirmPassword(){
    return this.registerForm.get('confirmPassword');
  }

}
