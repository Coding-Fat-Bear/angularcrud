
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
  public isCollapsed = false;
  btShow : boolean;
  selectbt : number;
  selected : Date;
  timesheets : Timesheet[];
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
  // console.log(str1);
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
      // console.log(this.timesheet.tsdate);
          // this.timesheet.checkin=data.checkin.substring(0,5);
          // this.timesheet.checkout=data.checkout.substring(0,5);
          if(this.timesheet.breakflag == "X"){
            this.btShow = true;
          }else{
            this.btShow = false;
          }

          this.loading = false;
    }
  },error => {this.timesheet.tsdate = this.dateCon(this.selected);
    this.timesheet.checkin= "";
     this.timesheet.checkout="";
     this.timesheet.otstart="";
     this.timesheet.otend="";
     this.timesheet.otbtstart="";
     this.timesheet.otbtend="";
     this.timesheet.btstart="";
     this.timesheet.btend="";
     this.timesheet.timeid=null;
     this.timesheet.comment="";
     console.log("Null Process");
     this.openSnackBar("No Records Found", "Hide")});
     
     this.loading = false;
     this.btShow = false;
  
}

   /////////on Start////////////
  ngOnInit(): void {
    console.log(this.today.getFullYear() +":"+(this.today.getMonth()+1));
    
    ///defualt date////

    this.getTimesheet();
    this.timesheet.loginid = 3;
    let thisDate = this.dateCon(this.today);
    // let thisDate = "2022-03-13";
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
            this.timesheet.btstart=data.otbtstart.substring(0,5);
            this.timesheet.btend=data.otbtend.substring(0,5);
            this.timesheet.btstart=data.otstart.substring(0,5);
            this.timesheet.btend=data.otend.substring(0,5);
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

  //////////// Servies/////////////
  private getTimesheet(){
    this.timesheetService.getTimesheetList().subscribe(data =>{
      this.timesheets = data;
    })
  }

   dateCon(str) {
    var date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }

  saveTimesheet()
  {

    
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

    if(this.timesheet.otbtstart == null){
    }
    else{
      this.timesheet.otbtstart = (this.timesheet.otbtstart+":00").substring(0,8); 
    }
    if(this.timesheet.otbtend == null){
    }
    else{
      this.timesheet.otbtend = (this.timesheet.otbtend+":00").substring(0,8); 
    }

    if(this.timesheet.otstart == null){
    }
    else{
      this.timesheet.otstart = (this.timesheet.otstart+":00").substring(0,8); 
    }
    if(this.timesheet.otend == null){
    }
    else{
      this.timesheet.otend = (this.timesheet.otend+":00").substring(0,8); 
    }



    this.timesheetService.postTimesheet(this.timesheet).subscribe(data =>{
      console.log("saved");
      this.openSnackBar("Saved", "Hide")
    },error => console.log(error))
    // }
    // else{
    //   this.openSnackBar("Fix Error", "Hide")
    // }
   
  }
  ////snack bar pop up//////
  openSnackBar(message: string, action: string) {
    
    let snackRef = this.snackBar.open(message,action,{duration : 1000});
  }


/// break checkbox/////
breakbox(checked:boolean){
  if(checked == true){
    console.log("checked");
    this.btShow = true;
    this.timesheet.breakflag = "X";
  }
  else{
    console.log("unchecked");
    this.timesheet.breakflag = "";
    this.btShow = false;
  }
}
check(){
  console.log(this.timesheet);
  
}
  

}
