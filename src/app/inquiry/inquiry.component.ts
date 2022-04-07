import { Component, OnInit } from '@angular/core';
import { Inquiry, Module } from '../inquiry';
import { InquiryService } from '../inquiry.service';


@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent implements OnInit {
   active = 0;
   inquiries!: Inquiry[];
   modules: any;
   module: String = "";
  constructor(private inquiryService: InquiryService) { }

  ngOnInit(): void {
    this.inquiryService.getInquiries().subscribe((data: Inquiry[]) => {
        console.log(data);
        this.inquiries = data;
                
    });

  }
   
/*   public getInquiryById(inqno){

  } */

}


