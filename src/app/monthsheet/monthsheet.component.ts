import { Time } from '@angular/common';
import { Timesheet } from './../timesheet';
import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../Services/timesheet.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-monthsheet',
  templateUrl: './monthsheet.component.html',
  styleUrls: ['./monthsheet.component.css']
})
export class MonthsheetComponent implements OnInit {
  
  // timesheet = new Timesheet();
  timesheets : Timesheet[];
  timesheets2 = [];
  timesheetsDis = [];
  timesheetsCopy= [];
  d10 = new Date();
  d1830 = new Date();
  d2359 = new Date();
  date1 = new Date();
  date2 = new Date();
  datebtstart = new Date();
  datebtend = new Date();
  dateotstart = new Date();
  dateotend = new Date();
  dateotbtstart = new Date();
  dateotbtend = new Date();
    ctShow: boolean = false;
    otShow: boolean = false;
    otbtShow: boolean = false;
    btShow: boolean = false;
    errorCheck : boolean;

  constructor( private timesheetService: TimesheetService,
               private snackBar: MatSnackBar,
               private route :ActivatedRoute,
               private titleService: Title) {}
  year  :   number;
  month : number;
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
    this.d10.setHours(10);
    this.d10.setMinutes(0);
    this.d10.setSeconds(0);

    this.d1830.setHours(18);
    this.d1830.setMinutes(30);
    this.d1830.setSeconds(0);

    this.d2359.setHours(23);
    this.d2359.setMinutes(59);
    this.d2359.setSeconds(0);

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
          str = a;
           hasDate = a;
          return  str.tsdate == time;  }))
            {
              this.timesheetsDis.push(hasDate);
            }
            else
            {var time1 = {}; 
            time1['loginid']  = Number( this.id);
            time1['tsdate']   = String(time);
            time1['checkin']  = null;
            time1['checkout'] = null;
            time1['otstart']  = null;
            time1['otend']    = null;
            time1['otbtstart']  = null;
            time1['otbtend']  = null;
            time1['btstart']  = null;
            time1['btend']    = null;
            time1['timeid']   = null;
            time1['comment']  = null;
            time1['breakflag']  = "";
            time1['daytype']  = 'none';
            time1['cflag']    = true;
            time1['otbkdischk']  = true;
            time1['error']    = "";
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
  
  const difference = [
    ...this.getDifference(this.timesheetsDis, this.timesheetsCopy),
    ...this.getDifference(this.timesheetsCopy, this.timesheetsDis)
  ];
  
  console.log(difference);
  console.log(this.timesheetsCopy);
  console.log(this.timesheetsDis);
  
  difference.forEach(timesheet=>{
    
if (timesheet.checkin !== null ) {
      if(timesheet.checkin.length !== 0){
        timesheet.checkin = (timesheet.checkin + ":00").substring(0, 8);
        }
}
if (timesheet.checkout !== null ) {
      if(timesheet.checkout.length !== 0){
          timesheet.checkout = (timesheet.checkout + ":00").substring(0, 8);
            }
}
if (timesheet.btstart !== null ) {
      if(timesheet.btstart.length !== 0){
        timesheet.btstart = (timesheet.btstart + ":00").substring(0, 8);
             }
}
if (timesheet.btend !== null ) {
    if(timesheet.btstart.length !== 0){
      timesheet.btend = (timesheet.btend + ":00").substring(0, 8);
    }
}
if (timesheet.otbtstart !== null ) {
  if(timesheet.otbtstart.length !== 0){
    timesheet.otbtstart = (timesheet.otbtstart + ":00").substring(0, 8);
  }
}
if (timesheet.otbtend !== null ) {
  if(timesheet.otbtend.length !== 0){
    timesheet.otbtend = (timesheet.otbtend + ":00").substring(0, 8);
  }
  
}
if (timesheet.otstart !== null ) {
  if(timesheet.otstart.length !== 0){
  timesheet.otstart = (timesheet.otstart + ":00").substring(0, 8);
  }
}
if (timesheet.otend !== null ) {
  if(timesheet.otend.length !==0 )
  {
  timesheet.otend = (timesheet.otend + ":00").substring(0, 8);
  }
}
  })
  difference.forEach(timesheetsave=>{
    console.log(timesheetsave);
    delete timesheetsave.cflag;
    delete timesheetsave.error;
    delete timesheetsave.otbkdischk;
    this.timesheetService.postTimesheet(timesheetsave).subscribe(data => {
      console.log("saved");
      this.openSnackBar("Saved", "Hide")
    }, error => console.log(error))
  })
  
}
openSnackBar(message: string, action: string) {

  let snackRef = this.snackBar.open(message, action, { duration: 1000 });
}
///////////errorcheck//////////////
checkinout(){
  
  const difference = [
    ...this.getDifference(this.timesheetsDis, this.timesheetsCopy),
    ...this.getDifference(this.timesheetsCopy, this.timesheetsDis)
  ];


  difference.forEach(timesheet=>{

    try {
      var inhr: any;
      var inmin :any;
      inmin = timesheet.checkin.substring(3, 5);
      inhr = timesheet.checkin.substring(0, 2);
      
      this.date1.setHours(inhr);
      this.date1.setMinutes(inmin);
      this.date1.setSeconds(0);
      
      var outhr: any;
      var outmin: any;
      outhr = timesheet.checkout.substring(0, 2);
      outmin = timesheet.checkout.substring(3, 5);
      this.date2.setHours(outhr);
      this.date2.setMinutes(outmin);
      this.date2.setSeconds(0);

      
        ///validation
      if (timesheet.checkin !== null && timesheet.checkout !== null ) {
        this.ctShow = !(this.date1 >= this.d10 && this.d1830 >= this.date2);
      }
      else {
        this.ctShow = false;
      }
    } catch (e) {
        this.ctShow = false;
      }
      //write on screen
      if(this.ctShow){
         timesheet.error = "not within working hours"
      }
      else{  
         timesheet.error= ""
      }

      if(!this.ctShow){
        this.ctShow = this.date1 > this.date2
        if(this.ctShow){
          timesheet.error = "checkin must be after checkout"
         //  this.errorCheck = true
       }
       else{  
          timesheet.error= ""
       }
      }
    }
    )
    }

    cusOtcheck()
    {
      if(!this.ctShow){
        const difference = [
          ...this.getDifference(this.timesheetsDis, this.timesheetsCopy),
          ...this.getDifference(this.timesheetsCopy, this.timesheetsDis)
        ];
      
      
        difference.forEach(timesheet=>{
          try{
          if (timesheet.otstart !== null && timesheet.otend !== null ) {
            var otinhr: any;
            var otinmin: any;
            otinhr = timesheet.otstart.substring(0, 2);
            otinmin = timesheet.otstart.substring(3, 5);
    
            var otouthr: any;
            var otoutmin: any;
            otouthr = timesheet.otend.substring(0, 2);
            otoutmin = timesheet.otend.substring(3, 5);
    
            this.dateotstart.setHours(otinhr);
            this.dateotstart.setMinutes(otinmin);
            this.dateotstart.setSeconds(0);
    
            this.dateotend.setHours(otouthr);
            this.dateotend.setMinutes(otoutmin);
            this.dateotend.setSeconds(0);
            this.otShow = !(this.d1830 < this.dateotstart && this.d2359 > this.dateotend && this.dateotstart < this.dateotend);
            
          }
          else {
            this.otShow = false;
          }
        } catch (e) {
          this.otShow =  false;
        }
        ///display error
          if(this.otShow){
            timesheet.error = "overtime time is wrong"
         }
         else{  
            timesheet.error= ""
         }
        

        })
    }
    }
    cusBtcheck()
    {
      if(!this.ctShow){
        const difference = [
          ...this.getDifference(this.timesheetsDis, this.timesheetsCopy),
          ...this.getDifference(this.timesheetsCopy, this.timesheetsDis)
        ];
      
      
        difference.forEach(timesheet=>{

          try {
            if (timesheet.btstart !== null && timesheet.btend !== null) {
              var btinhr: any;
              var btinmin: any;
              btinhr = timesheet.btstart.substring(0, 2);
              btinmin = timesheet.btstart.substring(3, 5);
      
              var btouthr: any;
              var btoutmin: any;
              btouthr = timesheet.btend.substring(0, 2);
              btoutmin = timesheet.btend.substring(3, 5);
      
              this.datebtstart.setHours(btinhr);
              this.datebtstart.setMinutes(btinmin);
              this.datebtstart.setSeconds(0);
      
              this.datebtend.setHours(btouthr);
              this.datebtend.setMinutes(btoutmin);
              this.datebtend.setSeconds(0);
      
              this.btShow = !(this.datebtstart >= this.date1 && this.datebtend < this.date2 && this.datebtstart < this.datebtend);
            }
            else {
              this.btShow = false;
            }
          } catch (e) {
      
            this.btShow = false;
          }
        ///displayerror
        if(this.btShow){
          timesheet.error = "breaktime is wrong"
       }
       else{  
          timesheet.error= ""
       }
        })
      }
    }
    cusOtBtcheck()
    {
      if(!this.otShow && !this.ctShow ){
        const difference = [
          ...this.getDifference(this.timesheetsDis, this.timesheetsCopy),
          ...this.getDifference(this.timesheetsCopy, this.timesheetsDis)
        ];
      
      
        difference.forEach(timesheet=>{
          try {
            if (timesheet.otbtstart !== null && timesheet.otbtend !== null) {
              var otbtinhr: any;
              var otbtinmin: any;
              otbtinhr = timesheet.otbtstart.substring(0, 2);
              otbtinmin = timesheet.otbtstart.substring(3, 5);
      
              var otbtouthr: any;
              var otbtoutmin: any;
              otbtouthr = timesheet.otbtend.substring(0, 2);
              otbtoutmin = timesheet.otbtend.substring(3, 5);
      
              this.dateotbtstart.setHours(otbtinhr);
              this.dateotbtstart.setMinutes(otbtinmin);
              this.dateotbtstart.setSeconds(0);
      
              this.dateotbtend.setHours(otbtouthr);
              this.dateotbtend.setMinutes(otbtoutmin);
              this.dateotbtend.setSeconds(0);
      
              this.otbtShow = !(this.dateotstart < this.dateotbtstart && this.dateotend > this.dateotbtend && this.dateotbtstart < this.dateotbtend);
      
      
            }
            else {
              this.otbtShow = false;
            }
          } catch (e) {
            console.log("string null : valid overtime's breaktime");
      
            this.otbtShow = false;
          }
          ////displayerror
          if(this.otbtShow){
            timesheet.error = "overtime'sbreaktime is wrong"
         }
         else{  
            timesheet.error= ""
         }


        })
      }
    }
    
    getDifference(array1, array2) {
      return array1.filter(object1 => {
        return !array2.some(object2 => {
          return object1.checkin === object2.checkin ||object1.checkout === object2.checkout;
        });
      });
    }

    //////// dropdown otbt show///////
  otbtshow(){
    const difference = [
      ...this.getDifference(this.timesheetsDis, this.timesheetsCopy),
      ...this.getDifference(this.timesheetsCopy, this.timesheetsDis)
    ];
    difference.forEach(timesheet=>{
    try{
    if (timesheet.otstart !== null && timesheet.otend !== null ) {
      if(timesheet.otstart.length !== 0 &&timesheet.otend.length !== 0){
      timesheet.otbkdischk = false;
      console.log("check");
      }
    }else{
      timesheet.otbkdischk = true;
    }} catch(e) {
      timesheet.otbkdischk = true;
    }
  })
  }

}
