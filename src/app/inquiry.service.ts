import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { BusinessLine, Currency, Inquiry, Language, Module, Phase, Unit } from './inquiry';


@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  private baseUrl = "http://localhost:8080/";
  /* private baseUrl1 = "http://localhost:8080/";  */

  constructor(private http: HttpClient) { }

    getInquiries(): Observable<Inquiry[]>{
      return this.http.get<Inquiry[]>(`${this.baseUrl + "Inquiries"}`);
    }
    
    getInquiry(inqno:number): Observable<any>{
      return this.http.get<any>("http://localhost:8080/Inquiries/" + inqno);
    }

    public saveInquiry(inquiry: Inquiry){
      return this.http.post("http://localhost:8080/createInquiry",inquiry);
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
