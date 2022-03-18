import * as moment from 'moment';
import { Timesheet } from './../timesheet';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimesheetService } from '../Services/timesheet.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  selected : Date;
  selectedtest = new Date("2022-03-15");
  selectedPre :String;
  timesheets : Timesheet[];
  values:any;
  timesheet = new Timesheet();
  checkinDis : string;
  checkoutDis : string;
 
  constructor(private timesheetService: TimesheetService,
    private router : Router) { }



    upDate(){
      console.log(this.selectedtest);
      
      this.selected = this.selectedtest;
    }
    upTime(checkin:any,checkout :any)
    {
      console.log(checkin + checkout );
      this.timesheet.checkin = checkin;
      this.timesheet.checkout = checkout;
      
      this.checkinDis = checkin;
      this.checkoutDis = checkout;
    }
   convert(event: any){
    console.log("event : ", event);
    console.log("selected :", this.selected);
   }

   /////////on Start////////////
  ngOnInit(): void {
    
    this.getTimesheet();
  }
  onKey(event: any)
  {
   
  }

  //////////// Servies/////////////
  private getTimesheet(){
    this.timesheetService.getTimesheetList().subscribe(data =>{
      this.timesheets = data;
    })
  }

   dateCon(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
}
