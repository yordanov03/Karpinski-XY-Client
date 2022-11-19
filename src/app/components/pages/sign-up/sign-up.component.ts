import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { matchValidator } from 'src/app/shared/password-validator';
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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
    return this.authService.register(this.registerForm.value).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.registerForm.reset();
          this.isSuccessful = true;
            const errorMessageStyle = document.getElementById("signupfailedErrorBox");
            errorMessageStyle.style.display = "none"
          setTimeout(() => {
            this.router.navigate([""])
          }, 3000);
        } else {
          console.log(res)
          this.isSignUpFailed = true;
          this.errorMessage = res.errors[0].description
        }
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
