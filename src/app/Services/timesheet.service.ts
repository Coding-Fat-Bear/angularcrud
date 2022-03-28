import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Timesheet } from '../timesheet';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  getTimesheetList(): Observable<Timesheet[]>{
    return  this.httpClient.get<Timesheet[]>(`${this.baseUrl}/gettime`);
  }

  postTimesheet(Timesheet: Timesheet) : Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/savetime`,Timesheet);
  }

  getTimesheetById(id:number): Observable<Timesheet>
  {
    return this.httpClient.get<Timesheet>(`${this.baseUrl}/gettime/${id}`);
  }
  getTimesheetBylogIdAndtsDate(logId:number,tsDate:String): Observable<Timesheet>
  {
    return this.httpClient.get<Timesheet>(`${this.baseUrl}/gettimeBydateAndloginid/${tsDate}/${logId}`);
  }

  updateTimesheet(id:number,Timesheet : Timesheet) :Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/puttime/${id}`,Timesheet)
  }



}
