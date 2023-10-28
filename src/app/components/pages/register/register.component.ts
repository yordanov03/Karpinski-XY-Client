import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from 'src/app/shared/password-validator';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../stores/auth/auth.actions'
import * as fromAuth from 'src/app/stores/auth/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSuccessful$ = this.store.select(fromAuth.selectIsSignupSuccessful);
  isSignUpFailed$ = this.store.select(fromAuth.selectIsSignupFailed);
  errorMessage = '';

  constructor(private fb: FormBuilder, private store: Store) {
    this.registerForm = this.fb.group({
      'username':['', [Validators.required, Validators.minLength(3)]],
      'email':['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(4), matchValidator('confirmPassword', true)]],
      'confirmPassword': ['', [Validators.required, matchValidator('password')] ]
    })
   }

  ngOnInit(): void {
  }

  register(){
    this.store.dispatch(AuthActions.register({ payload: this.registerForm.value }));
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
