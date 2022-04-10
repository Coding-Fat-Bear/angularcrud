import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Login } from '../login';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  LoginByUsernameAndPassword(logn:Login):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/login`,logn)
  }

  getloginById(id:number): Observable<Login>
  {
    return this.httpClient.get<Login>(`${this.baseUrl}/getlogin/${id}`);
  }
}
