
import { Timesheet } from './../timesheet';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimesheetService } from '../Services/timesheet.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  E1 : Boolean = false;
  selected : Date;
  timesheets : Timesheet[];
  // values:any;
  timesheet = new Timesheet();
  checkinDis : String;
  checkoutDis : String;
  today = new Date();
  loading : Boolean = false;
  constructor(private timesheetService: TimesheetService,
    private router : Router,
    private snackBar: MatSnackBar) { }

////Calander Event///////
calCheckUpdated(event)
{
  console.log("loading");
  this.loading = true;
  console.log(event);
  console.log(this.timesheet);
  
  var str1 = this.dateCon(event);
  console.log(str1);
  this.timesheetService.getTimesheetBylogIdAndtsDate(this.timesheet.loginid,str1).subscribe(data =>{
    if(data == null){
         this.timesheet.tsdate = this.dateCon(this.selected);
         this.timesheet.checkin= "";
          this.timesheet.checkout="";
          this.timesheet.timeid=null;
          console.log("Null Process how");
          
    }else{console.log(data.tsdate);
      
      console.log("Receiving Process");
      this.timesheet = data;
      console.log(this.timesheet.tsdate);
          this.timesheet.checkin=data.checkin.substring(0,5);
          this.timesheet.checkout=data.checkout.substring(0,5);
          
          this.loading = false;
    }
  },error => {this.timesheet.tsdate = this.dateCon(this.selected);
    this.timesheet.checkin= "";
     this.timesheet.checkout="";
     this.timesheet.btstart="";
     this.timesheet.btend="";
     this.timesheet.timeid=null;
     this.timesheet.comment="";
     console.log("Null Process");
     this.openSnackBar("No Records Found", "Hide")});
     
     this.loading = false;
  
}

   /////////on Start////////////
  ngOnInit(): void {

    ///defualt date////

    this.getTimesheet();
    this.timesheet.loginid = 3;
    let thisDate = this.dateCon(this.today);
    // console.log(thisDate);
    this.timesheetService.getTimesheetBylogIdAndtsDate(this.timesheet.loginid,thisDate).subscribe(data =>{
      if(data == null){
            console.log("Null Process");
            this.loading = false;
            
      }else{console.log(data.tsdate);
        
        console.log("Receiving Process");
        this.timesheet = data;
        console.log(this.timesheet.tsdate);
            this.timesheet.checkin=data.checkin.substring(0,5);
            this.timesheet.checkout=data.checkout.substring(0,5);
            this.timesheet.btstart=data.btstart.substring(0,5);
            this.timesheet.btend=data.btend.substring(0,5);
            this.loading = false;
      }
    },error => {this.timesheet.tsdate = this.dateCon(this.selected);
      this.timesheet.tsdate=thisDate;
       this.timesheet.timeid=null;
       console.log("Null Process");
       this.loading = false;
       this.openSnackBar("No Records Found", "Hide")});

    //////////////

    
    
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
    if(this.E1){

    
    console.log(this.timesheet);
    if(this.timesheet.checkin == null){
    }
    else{
      this.timesheet.checkin = (this.timesheet.checkin+":00").substring(0,8); 
    }
    if(this.timesheet.checkout == null){
    }
    else{
      this.timesheet.checkout = (this.timesheet.checkout+":00").substring(0,8); 
    }
    if(this.timesheet.btstart == null){
    }
    else{
      this.timesheet.btstart = (this.timesheet.btstart+":00").substring(0,8); 
    }
    if(this.timesheet.btend == null){
    }
    else{
      this.timesheet.btend = (this.timesheet.btend+":00").substring(0,8); 
    }
    this.timesheetService.postTimesheet(this.timesheet).subscribe(data =>{
      console.log("saved");
      this.openSnackBar("Saved", "Hide")
    },error => console.log(error))
    }
    else{
      this.openSnackBar("Fix Error", "Hide")
    }
   
  }
  ////snack bar pop up//////
  openSnackBar(message: string, action: string) {
    
    let snackRef = this.snackBar.open(message,action,{duration : 1000});
  }
  checkbt(){
    if(this.timesheet.btend ==null ||this.timesheet.btstart ==null ){

    }else{
      this.checkbts();
      this.checkbte();
    }
    
  }
  
  ////start check
  checkbts()
  {

    ////checin out check
    if (!(this.timesheet.checkin == null) )
    {
        console.log(this.timesheet.checkin < this.timesheet.btstart);
        console.log(this.timesheet.btstart < this.timesheet.checkout);
        
        
      if(this.timesheet.checkin < this.timesheet.btstart && this.timesheet.btstart < this.timesheet.checkout)
      {
        this.E1 = false;
        console.log("ok");
      }
      else
      {
        
        console.log("in early");
        console.log("start error");
        this.E1 = true;
      }
    }
    
    console.log(this.timesheet.btstart);
    
  }
/////endcheck
  checkbte(){
    ////checin out check
    if (!(this.timesheet.checkin == null) )
    {
        console.log(this.timesheet.checkin < this.timesheet.btend);
        console.log(this.timesheet.btend < this.timesheet.checkout);
        
        
      if(this.timesheet.checkin < this.timesheet.btend && this.timesheet.btend < this.timesheet.checkout)
      {
        this.E1 = false;
        console.log("ok");
      }
      else
      {
        console.log(" error");
        this.E1 = true;
      }
    }
  

    console.log(this.timesheet.btend);
  
}


  checkts(){
    console.log(this.E1);
    
    console.log(this.timesheet);
    if(this.timesheet.btend==null){
      console.log("null");
    }
      else{
        console.log("not null");
        
      }
      
   
  }

  

}
