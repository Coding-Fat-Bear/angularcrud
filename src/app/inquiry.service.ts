import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { BusinessLine, Currency, Inquiry, Language, Module, Phase, Unit } from './inquiry';


@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  private baseUrl = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

    getInquiries(): Observable<Inquiry[]>{
      return this.http.get<Inquiry[]>(`${this.baseUrl + "Inquiries"}`);
    }
    
    getInquiry(inqno:number): Observable<Inquiry>{
      return this.http.get<Inquiry>(`${this.baseUrl}Inquiries/${inqno}`);
    }

    public saveInquiry(inquiry: Inquiry){
      return this.http.post(`${this.baseUrl}createInquiry`,inquiry);
    }

  /*   public updateInquiry(inqno:number, inquiry: Inquiry): Observable<Inquiry>
    {
      return this.http.put<Inquiry>(`${this.baseUrl}editInquiry/${inqno}`, inquiry);
    } */
    
    public updateInquiry(inqno:number, inquiry: Inquiry){
      return this.http.put(`${this.baseUrl}editInquiry/${inqno}`, inquiry);
    }

    deleteInquiry(inqno:number){
      return this.http.delete(`${this.baseUrl}Inquiries/${inqno}`);
    }


  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.baseUrl + "Modules"}`);
  }

  getBusinessLines(): Observable<BusinessLine[]> {
    return this.http.get<BusinessLine[]>(`${this.baseUrl + "BusinessLines"}`);
  }

  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(`${this.baseUrl + "Languages"}`);
  }

  getPhases(): Observable<Phase[]> {
    return this.http.get<Phase[]>(`${this.baseUrl + "Phases"}`);
  }

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.baseUrl + "Currencies"}`);
  }

  getUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${this.baseUrl + "Units"}`);
  }

}
