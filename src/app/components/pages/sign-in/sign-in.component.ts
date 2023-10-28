import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../stores/auth/auth.actions'
import * as fromAuth from 'src/app/stores/auth/auth.selectors';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent{
  loginForm: FormGroup;
  isLoggedIn$ = this.store.select(fromAuth.selectIsLoggedIn);
  username$ = this.store.select(fromAuth.selectUsername)
  

  constructor(private fb: FormBuilder, 
    private store: Store)
     {
      this.loginForm = this.fb.group({
        'username':['', [Validators.required, Validators.email]],
        'password':['', Validators.required]
        })
     }

  login(){
    this.store.dispatch(AuthActions.login({ payload: this.loginForm.value }));
  }
  
  get username(){
    return this.loginForm.get('username')
  }
  
  get password(){
    return this.loginForm.get('password')
  }
}
