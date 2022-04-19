import { Timesheet } from './../timesheet';
import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../Services/timesheet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monthsheet',
  templateUrl: './monthsheet.component.html',
  styleUrls: ['./monthsheet.component.css']
})
export class MonthsheetComponent implements OnInit {
  
  timesheet = new Timesheet();
  timesheets : Timesheet[];
  constructor( private timesheetService: TimesheetService,
               private route :ActivatedRoute,) {}
  year:any;
  month:any;
  id:any;
monthday : Date[];
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    console.log(this.month);
    console.log(this.year);

    this.monthday = this.getDaysInMonth(3, 2022) ;

       this.monthday.forEach(day=>{
        console.log(day);
        

       }
       );
    
      this.timesheetService.getTimesheetByMonthAndYear(this.month,this.year,this.id).subscribe(data => {
       this.timesheets = data;
    })
    
    this.year = ''+this.route.snapshot.params['year'];
    this.month = ''+this.route.snapshot.params['month'];

  }
   getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      var datestr = new Date(date);
      days.push(this.dateCon(datestr));
      date.setDate(date.getDate() + 1);

    }
    return days;
  }

  dateCon(str) {
    var date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }
}
