import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Login } from '../login';

import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  $isLoggedIn = new EventEmitter();

  lgdt: Login ={
    loginid: 0,
    empid: undefined,
    username: undefined,
    password: undefined
  };

  private baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  LoginByUsernameAndPassword(logn:Login):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/login`,logn)

    this.lgdt.loginid = logn.loginid;
    this.lgdt.empid = logn.empid;
    this.lgdt.username = logn.username;
    this.lgdt.password = logn.password;

    this.$isLoggedIn.emit(this.lgdt);
  }
}
