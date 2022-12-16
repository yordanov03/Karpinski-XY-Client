import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private loggedIn = new BehaviorSubject<boolean>(false);
private currentUser = new BehaviorSubject<User>(null);
private loginPath = environment.apiUrl + 'identity/login'
private registerPath = environment.apiUrl + 'identity/register'
user: User;

  constructor(private http: HttpClient) { }

  login(data: Observable<any>){
    this.currentUser.next(this.user);
    this.loggedIn.next(true)
    return this.http.post(this.loginPath, data)
  }

  register(data: Observable<any>){
    return this.http.post(this.registerPath, data)
  }

  saveUserInfo(data){
    this.user = new User(data['username'], data['token'], data['id'])
    localStorage.setItem('userInfo', JSON.stringify(this.user));
  }

  getUserInfo(){
    return localStorage.getItem('userInfo');
  }

  clearUserInfo(){
    this.currentUser.next(null);
    this.loggedIn.next(false)
    localStorage.removeItem('userInfo');
  }

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  get loggedinUser(){
    return this.currentUser.asObservable();
  }

  autoLogin(){
    if(this.getUserInfo()){
      this.loggedIn.next(true);
      var userInfo = JSON.parse(this.getUserInfo())
      this.user = new User(userInfo['username'], userInfo['token'], userInfo['id'])
      this.currentUser.next(this.user);
    }
  }

  logout(){
    this.currentUser.next(null);
    this.loggedIn.next(false)
    localStorage.removeItem('userInfo');
  }

}
