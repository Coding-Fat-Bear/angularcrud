import { Time } from '@angular/common';
import { Timesheet } from './../timesheet';
import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../Services/timesheet.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
   timesheetsCopy= [];
  constructor( private timesheetService: TimesheetService,
               private route :ActivatedRoute,private titleService: Title) {}
               public setTitle(newTitle: string) {
              }
  year:number;
  month:number;
  yearnum  : number;
  monthnum : number;
  id  : any;
  monthday : Date[];
  classifs = [
    {id:0,name:'none',type:'none'},
    {id:1,name:'AM Leave',type:'halffirs'},
    {id:2,name:'PM Leave',type:'halfseco'},
    {id:3,name:'Holiday',type:'fullpaid'},
    {id:4,name:'Leave',type:'fullunpd'},
    {id:5,name:'Absence',type:'fullunpd'},
    {id:6,name:'Relocation',type:'fullunpd'},
    {id:7,name:'Menstrual Leave (Paid)',type:'fullpaid'},
    {id:17,name:'Menstrual Leave (unpaid)',type:'fullunpd'},
    {id:8,name:'New Year Holiday',type:'fullunpd'},
    {id:9,name:'Child Nursing Leave',type:'fullunpd'},
    {id:10,name:'Maternity leave',type:'fullpaid'},
    {id:11,name:'Disater',type:'fullpaid'},
    {id:12,name:'Industrial Accident',type:'fullpaid'},
    {id:13,name:'Summer Vacation',type:'fullpaid'},
    {id:14,name:'Paid Holiday',type:'fullpaid'},
    {id:15,name:'Special Absence',type:'fullpaid'},
    {id:16,name:'Medical Examination',type:'fullpaid'},]
  
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

      this.monthday.forEach(b=>{
        var time = {}; 
        var hasDate;
        var adddDate;
        time = String(b);
 
      if(this.timesheets2.some(a=>{
          var str = new Timesheet();
          str = a; hasDate = a;
          return  str.tsdate == time;  }))
            {
              this.timesheetsDis.push(hasDate);
            }
            else
            {var time1 = {}; 
            time1['loginid']  = null;
            time1['tsdate'] = String(time);
            time1['checkin']  = null;
            time1['checkout']  = null;
            time1['otstart']  = null;
            time1['otend']  = null;
            time1['otbtstart']  = null;
            time1['otbtend']  = null;
            time1['btstart']  = null;
            time1['btend']  = null;
            time1['timeid']  = null;
            time1['comment']  = null;
            time1['breakflag']  = null;
            time1['daytype']  = 'none';
            time1['cflag'] = true;
            this.timesheetsDis.push(time1)
            }
  this.timesheetsCopy =  this.timesheetsDis.map(a => Object.assign({}, a));
})

        })
       
  }
  ///////////////toget the days of a month in array/////////////
   getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) 
    {
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

////////////fetch table from screen/////////////
ex()
{

  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return !array2.some(object2 => {
        return object1.checkin === object2.checkin ||object1.checkout === object2.checkout;
      });
    });

  }
  


  const difference = [
    ...getDifference(this.timesheetsDis, this.timesheetsCopy),
    ...getDifference(this.timesheetsCopy, this.timesheetsDis)
  ];
  
  console.log(difference);
  console.log(this.timesheetsCopy);
  console.log(this.timesheetsDis);
  
  difference.forEach(timesheet=>{
    
if (timesheet.checkin == null) {
}
else {
  timesheet.checkin = (timesheet.checkin + ":00").substring(0, 8);
}
if (timesheet.checkout == null) {
}
else {
  timesheet.checkout = (timesheet.checkout + ":00").substring(0, 8);
}

if (timesheet.btstart == null) {
}
else {
  timesheet.btstart = (timesheet.btstart + ":00").substring(0, 8);
}
if (timesheet.btend == null) {

}
else {
  timesheet.btend = (timesheet.btend + ":00").substring(0, 8);
}

if (timesheet.otbtstart == null) {
}
else {
  timesheet.otbtstart = (timesheet.otbtstart + ":00").substring(0, 8);
}
if (timesheet.otbtend == null) {
}
else {
  timesheet.otbtend = (timesheet.otbtend + ":00").substring(0, 8);
}

if (timesheet.otstart == null) {
}
else {
  timesheet.otstart = (timesheet.otstart + ":00").substring(0, 8);
}
if (timesheet.otend == null) {
}
else {
  timesheet.otend = (timesheet.otend + ":00").substring(0, 8);
}
  })
  
  
}
}
