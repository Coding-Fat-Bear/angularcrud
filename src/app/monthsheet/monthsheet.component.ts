import { Time } from '@angular/common';
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
  
   timesheets2 = [];
   timesheetsDis = [];
  
  constructor( private timesheetService: TimesheetService,
               private route :ActivatedRoute,) {}
  year:number;
  month:number;
  yearnum  : number;
  monthnum : number;
  id:any;
monthday : Date[];
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.month = Number(this.route.snapshot.params['month']);
    this.year =  Number(this.route.snapshot.params['year']);
    this.monthday = this.getDaysInMonth(this.month -1, this.year) ;
    var times = [];
    this.monthday.forEach(day=>
      {
          var time = {}; 
            time['tsdate'] = String(day);
            times.push(time);
      }
    );
        
    this.timesheetService.getTimesheetByMonthAndYear(this.month,this.year,this.id).subscribe(data =>
        {
        this.timesheets = data; 
        
        data.forEach(a=>{
            this.timesheets2.push(a);
        })
/////////////////
        this.timesheets2.forEach(a=>{
          var str = new Timesheet();
          str = a;
          this.monthday.forEach(b=>{
            var time = {}; 
            time = String(b);
            if((str.tsdate == time)){
                console.log('works'); 
            }
          })
        })
////////////////
this.monthday.forEach(b=>{
  var time = {}; 
  var hasDate;
  var adddDate;
  time = String(b);
  // this.timesheets2.forEach(a=>{
  //   var str = new Timesheet();
  //         str = a;
  //   if(str.tsdate == time){
  //     console.log(true);
  //   }
  // })

  // console.log(this.timesheets2.some(a=>{
  //   var str = new Timesheet();
  //          str = a;
  //        return  str.tsdate == time;
  // })
  // );

   if(this.timesheets2.some(a=>{
         var str = new Timesheet();
         str = a; hasDate = a;
                            return  str.tsdate == time;  }))
            {
              // console.log("hasdate");
              this.timesheetsDis.push(hasDate);
            }
            else
            {var time1 = {}; 
            time1['tsdate'] = String(time);
            time1['cflag'] = true;
            // times.push(time1);
              this.timesheetsDis.push(time1);
              // console.log('adddate');
              
            }
  
})


        })
        
        console.log(this.timesheetsDis);
        
     
    // this.monthday.forEach(da=>{
    //   console.log(da);
    //   console.log('hi');
      
      
    // })
    
  }

  

  ///////////////toget the days of a month in array/////////////
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
//////////////to convert to a required date format///////////////
  dateCon(str) {
    var date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }
}
