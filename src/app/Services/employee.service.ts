import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


import { Observable } from 'rxjs';
import { Employee } from "../employee";
@Injectable({
  providedIn: 'root'
})

export class EmployeeService{

  private baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  getEmployeeByID(empcod:BigInteger){
    return this.httpClient.get<Employee>(`${this.baseUrl}/Employee/${empcod}`);
  }


}
