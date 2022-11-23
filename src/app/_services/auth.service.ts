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
private loginPath = environment.apiUrl + 'identity/login'
private registerPath = environment.apiUrl + 'identity/register'

  constructor(private http: HttpClient) { }

  login(data: Observable<any>){
    var user = new User("bla", "some token")
    this.loggedIn.next(true)
    return this.http.post(this.loginPath, data)
  }

  register(data: Observable<any>){
    return this.http.post(this.registerPath, data)
  }

  saveToken(token){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  autoLogin(){
    if(this.getToken()){
      var user = new User("bla", "some token")
      this.loggedIn.next(true);
    }
  }

}
