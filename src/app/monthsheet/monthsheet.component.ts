import { Timesheet } from './../timesheet';
import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../Services/timesheet.service';

@Component({
  selector: 'app-monthsheet',
  templateUrl: './monthsheet.component.html',
  styleUrls: ['./monthsheet.component.css']
})
export class MonthsheetComponent implements OnInit {
  
  timesheet = new Timesheet();
  timesheets : Timesheet[];
  constructor( private timesheetService: TimesheetService) {}
  year:any;
  month:any;

  
  ngOnInit(): void {
      this.timesheetService.getTimesheetByMonthAndYear(3,2022,3).subscribe(data => {
       this.timesheets = data;
       ;
    })
  }

}
