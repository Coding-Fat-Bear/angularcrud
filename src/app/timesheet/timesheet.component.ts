import { Time } from '@angular/common';
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
  selected : Date = new Date();
  timesheets : Timesheet[];
  values:any;
  timesheet = new Timesheet();
 
 
  constructor(private timesheetService: TimesheetService,
    private router : Router) { }
   convert(event: any){
    console.log("Date changed", event);
    let date = JSON.stringify(event)
   date= date.slice(1,11) 
  //  this.selected =date;
    console.log("Date changed", date);
    console.log("Date changed", this.selected);
   }
  ngOnInit(): void {
    
    this.getTimesheet();
  }
  onKey(event: any)
  {
    console.log(this.timesheet.checkout);
    
   
  }
  private getTimesheet(){
    this.timesheetService.getTimesheetList().subscribe(data =>{
      this.timesheets = data;
    })
  }

  updateTimesheet(id: number){
    this.router.navigate(['update',id]);
  }
}
