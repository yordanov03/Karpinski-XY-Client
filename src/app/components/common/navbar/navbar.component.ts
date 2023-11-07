import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import * as fromAuth from 'src/app/stores/auth/auth.selectors';
import * as AuthActions from '../../../stores/auth/auth.actions'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>; 
  username$: Observable<string>

  constructor(private store: Store) { }

  ngOnInit() {
    this.username$ = this.store.select(fromAuth.selectUsername)
    this.isLoggedIn$ = this.store.select(fromAuth.selectIsLoggedIn)
  }

  logout(){
  this.store.dispatch(AuthActions.logout());
  }

}
