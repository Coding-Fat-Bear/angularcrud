import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Timesheet } from '../timesheet';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  
  private baseGetUrl = "http://localhost:8080/gettime";
  private basePostUrl = "http://localhost:8080/savetime";
  private basePutUrl = "http://localhost:8080/puttime";

  constructor(private httpClient: HttpClient) { }

  getTimesheetList(): Observable<Timesheet[]>{
    return  this.httpClient.get<Timesheet[]>(`${this.baseGetUrl}`);
  }

  postTimesheet(Timesheet: Timesheet) : Observable<Object>{
    return this.httpClient.post(`${this.basePostUrl}`,Timesheet);
  }

  getTimesheetById(id:number): Observable<Timesheet>
  {
    return this.httpClient.get<Timesheet>(`${this.baseGetUrl}/${id}`);
  }

  updateTimesheet(id:number,Timesheet : Timesheet) :Observable<Object>{
    return this.httpClient.put(`${this.basePutUrl}/${id}`,Timesheet)
  }

}
