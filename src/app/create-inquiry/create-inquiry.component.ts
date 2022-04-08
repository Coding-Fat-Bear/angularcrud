import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessLine, Currency, Inquiry, Language, Module, Phase, Unit } from '../inquiry';
import { InquiryService } from '../inquiry.service';

@Component({
  selector: 'app-create-inquiry',
  templateUrl: './create-inquiry.component.html',
  styleUrls: ['./create-inquiry.component.css']
})
export class CreateInquiryComponent implements OnInit {
  active =0;

    inquiry: Inquiry = new Inquiry(0,"",0,"","","","","","","","","","",0,"",0,"",0,0,"","","",""/* ,"","" */);
     message:any;
     modules: any;
     module: String="";
     businesslines: any;
     businessline: String="";
     languages: any;
     language: String = "";
     phases: any;
     phase: String = "";
     currencies: any;
     currency: String = "";
     units: any;
     unit: String = "";
  constructor(private inquiryService: InquiryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.inquiryService.getModules().subscribe((data: Module[]) => {
      console.log(data);
      this.modules = data;

    });

    this.inquiryService.getBusinessLines().subscribe((data: BusinessLine[]) => {
      console.log(data);
      this.businesslines = data;

    });
    
    this.inquiryService.getLanguages().subscribe((data: Language[]) => {
      console.log(data);
      this.languages = data;

    });

    this.inquiryService.getPhases().subscribe((data: Phase[]) => {
      console.log(data);
      this.phases = data;

    });

    this.inquiryService.getCurrencies().subscribe((data: Currency[]) => {
      console.log(data);
      this.currencies = data;

    });

    this.inquiryService.getUnits().subscribe((data: Unit[]) => {
      console.log(data);
      this.units = data;

    });

  }

  public createInquiry(){
 /*  console.log(this.inquiry);
  
   let resp = this.inquiryService.saveInquiry(this.inquiry);
   resp.subscribe((data)=>this.message=data);
   console.log(resp); */
    this.inquiryService.saveInquiry(this.inquiry).subscribe
                               (data => console.log(data),
                               error => console.log(error));
                              
  
  }

  public getInquiryById(){

    console.log(this.inquiry.inqno);
    
    this.inquiryService.getInquiry(this.inquiry.inqno).subscribe(data => 
     { this.inquiry = data;
      console.log(data)},
      error => console.log(error));   

      
  }

}


