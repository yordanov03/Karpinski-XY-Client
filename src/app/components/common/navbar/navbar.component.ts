import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/_models/user.model';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;  
  currentUser$: Observable<User>;
  user: User;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.currentUser$ = this.authService.loggedinUser
    this.currentUser$.subscribe({next: user=>{this.user = user} })
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.authService.autoLogin();
  }

  logout(event:any){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
