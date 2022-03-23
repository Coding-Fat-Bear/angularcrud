
import * as moment from 'moment';
import { Timesheet } from './../timesheet';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimesheetService } from '../Services/timesheet.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { NgClass } from '@angular/common';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  selected : Date;
  // selectedtest = new Date("2022-03-15");
  // selectedPre :String;
  timesheets : Timesheet[];
  // values:any;
  timesheet = new Timesheet();
  checkinDis : String;
  checkoutDis : String;
 
  constructor(private timesheetService: TimesheetService,
    private router : Router,
    private snackBar: MatSnackBar) { }

////Calander Event///////
calCheckUpdated(event)
{
  var str1 = this.dateCon(event);
  console.log(str1);
  this.timesheetService.getTimesheetBylogIdAndtsDate(this.timesheet.loginid,str1).subscribe(data =>{
    if(data == null){
      // console.log("u nee god now");
      //    this.timesheet.tsdate = this.dateCon(this.selected);
      //    this.timesheet.checkin= "";
      //     this.timesheet.checkout="";
      //     this.timesheet.timeid=null;
          console.log("Null Process");
          
    }else{console.log(data.tsdate);
      
      console.log("Receiving Process");
      this.timesheet = data;
      console.log(this.timesheet.tsdate);
          this.timesheet.checkin=data.checkin.substring(0,5);
          this.timesheet.checkout=data.checkout.substring(0,5);
    }
  },error => {this.timesheet.tsdate = this.dateCon(this.selected);
    this.timesheet.checkin= "";
     this.timesheet.checkout="";
     this.timesheet.timeid=null;
     console.log("Null Process");
     this.openSnackBar("No Records Found", "Hide")});
  // var str1 = "2022-03-16";
  // this.timesheetService.getTimesheetBylogIdAndtsDate(3,str1).subscribe(
  // {
  //   next(v) {
  //     if(v == null)
  //     {
  //       console.log("null");
        
  //     }
  //     else
  //     {
  //       console.log(this.timesheet);
  //       this.timesheet = v;
  //       // this.checkoutDis = this.timesheet.checkout;
  //       // this.checkinDis = this.timesheet.checkin;
  //       console.log(this.timesheet);
  //       // console.log(this.checkinDis);
  //       // console.log(this.checkoutDis);
  //     }
  //   },
  //   error(msg) {
  //     console.log('Error Getting Location: ', msg);
  //   }
  // })
  
}

   /////////on Start////////////
  ngOnInit(): void {
    
    this.getTimesheet();
    this.timesheet.loginid = 3;
    // this.timesheet.tsdate = Date.now();
    console.log(Date.now());
    
  }
  // onKey(event: any)
  // {
   
  // }

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

  saveTimesheet()
  {
    console.log(this.timesheet);
    console.log((this.timesheet.checkin+":00").substring(0,8));
    // this.timesheet.tsdate = 
    this.timesheet.checkin = (this.timesheet.checkin+":00").substring(0,8);
    this.timesheet.checkout = (this.timesheet.checkout+":00").substring(0,8);
    this.timesheetService.postTimesheet(this.timesheet).subscribe(data =>{
      console.log("saved");
      this.openSnackBar("Saved", "Hide")
    },error => console.log(error))
  }
  ////snack bar pop up//////
  openSnackBar(message: string, action: string) {
    
    let snackRef = this.snackBar.open(message,action,{duration : 1000});
  }

}
