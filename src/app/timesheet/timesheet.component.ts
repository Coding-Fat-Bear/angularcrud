
import { Timesheet } from './../timesheet';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimesheetService } from '../Services/timesheet.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  btShow: boolean;
  ctShow: boolean = false;
  ctShowbefore: boolean = false;
  selectbt: number;
  selected: Date;
  d10 = new Date();
  d1830 = new Date();
  d2359 = new Date();
  datebtstart = new Date();
  datebtend = new Date();
  dateotstart = new Date();
  dateotend = new Date();
  dateotbtstart = new Date();
  dateotbtend = new Date();

  timesheets: Timesheet[];
  timesheet = new Timesheet();
  today = new Date();
  date1 = new Date();
  date2 = new Date();
  date3 = new Date();
  date4 = new Date();
  loading: Boolean = false;
  constructor(private timesheetService: TimesheetService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  /////date validation checkin and out order/////
  ctShowb(): boolean {
    try {
      var inhr: any;
      inhr = this.timesheet.checkin.substring(0, 2);
      var outhr: any;
      this.date1.setHours(inhr);
      var oumin: any;
      outhr = this.timesheet.checkout.substring(0, 2);
      oumin = this.timesheet.checkout.substring(3, 5);
      this.date2.setHours(outhr);
      this.date2.setMinutes(oumin)

      // return true;
      return this.date1 < this.date2;
    } catch (e) {
      return true;
    }

  }
  /////date validation checkin and out valid work time/////
  chtime() {
    console.log("checks works");

    try {
      if (this.timesheet.checkin.length !== 0 && this.timesheet.checkout.length !== 0 && !(this.ctShowbefore)) {
        console.log('works');


        var inhr: any;
        inhr = this.timesheet.checkin.substring(0, 2);

        var outhr: any;
        var oumin: any;
        outhr = this.timesheet.checkout.substring(0, 2);
        oumin = this.timesheet.checkout.substring(3, 5);
        this.ctShow = !(this.date1 >= this.d10 && this.date2 < this.d1830);
      }
      else {
        this.ctShow = false;
      }
    } catch (e) {
      console.log(e);

      this.ctShow = false;
    }


  }
  /////date validation checkin and out valid breaktime /////
  cusbtcheck() {
    try {
      if (this.timesheet.btstart.length !== 0 && this.timesheet.btend.length !== 0 && !(this.ctShowbefore)) {
        var btinhr: any;
        var btinmin: any;
        btinhr = this.timesheet.btstart.substring(0, 2);
        btinmin = this.timesheet.btstart.substring(3, 5);

        var btouthr: any;
        var btoutmin: any;
        btouthr = this.timesheet.btend.substring(0, 2);
        btoutmin = this.timesheet.btend.substring(3, 5);

        this.datebtstart.setHours(btinhr);
        this.datebtstart.setMinutes(btinmin);
        this.datebtstart.setSeconds(0);

        this.datebtend.setHours(btouthr);
        this.datebtend.setMinutes(btoutmin);
        this.datebtend.setSeconds(0);

        return !(this.datebtstart >= this.date1 && this.datebtend < this.date2 && this.datebtstart < this.datebtend);
      }
      else {
        return false;
      }
    } catch (e) {
      console.log("string null : valid work time");

      return false;
    }
  }


  /////date validation checkin and out valid over time/////
  cusotcheck() {
    try {
      if (this.timesheet.otstart.length !== 0 && this.timesheet.otend.length !== 0 && !(this.ctShowbefore)) {
        var otinhr: any;
        var otinmin: any;
        otinhr = this.timesheet.otstart.substring(0, 2);
        otinmin = this.timesheet.otstart.substring(3, 5);

        var otouthr: any;
        var otoutmin: any;
        otouthr = this.timesheet.otend.substring(0, 2);
        otoutmin = this.timesheet.otend.substring(3, 5);

        this.dateotstart.setHours(otinhr);
        this.dateotstart.setMinutes(otinmin);
        this.dateotstart.setSeconds(0);

        this.dateotend.setHours(otouthr);
        this.dateotend.setMinutes(otoutmin);
        this.dateotend.setSeconds(0);

        return !(this.d1830 < this.dateotstart && this.d2359 > this.dateotend && this.dateotstart < this.dateotend);


      }
      else {
        return false;
      }
    } catch (e) {
      console.log("string null : valid over time");

      return false;
    }

  }
  //////////date validation checkin and out valid overtime's breaktime///////////
  cusotbtcheck() {
    try {
      if (this.timesheet.otbtstart.length !== 0 && this.timesheet.otbtend.length !== 0 && !(this.ctShowbefore)) {
        var otbtinhr: any;
        var otbtinmin: any;
        otbtinhr = this.timesheet.otbtstart.substring(0, 2);
        otbtinmin = this.timesheet.otbtstart.substring(3, 5);

        var otbtouthr: any;
        var otbtoutmin: any;
        otbtouthr = this.timesheet.otbtend.substring(0, 2);
        otbtoutmin = this.timesheet.otbtend.substring(3, 5);

        this.dateotbtstart.setHours(otbtinhr);
        this.dateotbtstart.setMinutes(otbtinmin);
        this.dateotbtstart.setSeconds(0);

        this.dateotbtend.setHours(otbtouthr);
        this.dateotbtend.setMinutes(otbtoutmin);
        this.dateotbtend.setSeconds(0);

        return !(this.dateotstart < this.dateotbtstart && this.dateotend > this.dateotbtend && this.dateotbtstart < this.dateotbtend);


      }
      else {
        return false;
      }
    } catch (e) {
      console.log("string null : valid overtime's breaktime");

      return false;
    }
  }


  //////check///////
  check() {
    console.log(this.timesheet);

    console.log(this.d10);
    console.log(this.d1830);

    console.log(this.dateotstart);
    console.log(this.dateotend);

  }

  ////Calander Event///////
  calCheckUpdated(event) {
    console.log("loading");
    this.loading = true;
    console.log(event);
    console.log(this.timesheet);

    var str1 = this.dateCon(event);
    // console.log(str1);
    this.timesheetService.getTimesheetBylogIdAndtsDate(this.timesheet.loginid, str1).subscribe(data => {
      if (data == null) {
        this.timesheet.tsdate = this.dateCon(this.selected);
        this.timesheet.checkin = "";
        this.timesheet.checkout = "";
        this.timesheet.timeid = null;
        console.log("Null Process how");

      } else {
        console.log(data.tsdate);

        console.log("Receiving Process");
        this.timesheet = data;
        // console.log(this.timesheet.tsdate);
        // this.timesheet.checkin=data.checkin.substring(0,5);
        // this.timesheet.checkout=data.checkout.substring(0,5);
        if (this.timesheet.breakflag == "X") {
          this.btShow = true;
        } else {
          this.btShow = false;
        }

        this.loading = false;
      }
    }, error => {
      this.timesheet.tsdate = this.dateCon(this.selected);
      this.timesheet.checkin = "";
      this.timesheet.checkout = "";
      this.timesheet.otstart = "";
      this.timesheet.otend = "";
      this.timesheet.otbtstart = "";
      this.timesheet.otbtend = "";
      this.timesheet.btstart = "";
      this.timesheet.btend = "";
      this.timesheet.timeid = null;
      this.timesheet.comment = "";
      console.log("Null Process");
      this.openSnackBar("No Records Found", "Hide")
    });

    this.loading = false;
    this.btShow = false;

  }

  /////////on Start////////////
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

    console.log(this.today.getFullYear() + ":" + (this.today.getMonth() + 1));

    ///defualt date////

    this.getTimesheet();
    this.timesheet.loginid = 3;
    let thisDate = this.dateCon(this.today);
    // let thisDate = "2022-03-13";
    // console.log(thisDate);
    this.timesheetService.getTimesheetBylogIdAndtsDate(this.timesheet.loginid, thisDate).subscribe(data => {
      if (data == null) {
        console.log("Null Process");
        this.loading = false;

      } else {
        console.log(data.tsdate);

        console.log("Receiving Process");
        this.timesheet = data;
        console.log(this.timesheet.tsdate);
        this.timesheet.checkin = data.checkin.substring(0, 5);
        this.timesheet.checkout = data.checkout.substring(0, 5);
        this.timesheet.btstart = data.otbtstart.substring(0, 5);
        this.timesheet.btend = data.otbtend.substring(0, 5);
        this.timesheet.btstart = data.otstart.substring(0, 5);
        this.timesheet.btend = data.otend.substring(0, 5);
        this.timesheet.btstart = data.btstart.substring(0, 5);
        this.timesheet.btend = data.btend.substring(0, 5);
        this.loading = false;
      }
    }, error => {
      this.timesheet.tsdate = this.dateCon(this.selected);
      this.timesheet.tsdate = thisDate;
      this.timesheet.timeid = null;
      console.log("Null Process");
      this.loading = false;
      this.openSnackBar("No Records Found", "Hide")
    });

    //////////////



  }

  //////////// Servies/////////////
  private getTimesheet() {
    this.timesheetService.getTimesheetList().subscribe(data => {
      this.timesheets = data;
    })
  }

  dateCon(str) {
    var date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }

  saveTimesheet() {


    console.log(this.timesheet);
    if (this.timesheet.checkin == null) {
    }
    else {
      this.timesheet.checkin = (this.timesheet.checkin + ":00").substring(0, 8);
    }
    if (this.timesheet.checkout == null) {
    }
    else {
      this.timesheet.checkout = (this.timesheet.checkout + ":00").substring(0, 8);
    }

    if (this.timesheet.btstart == null) {
    }
    else {
      this.timesheet.btstart = (this.timesheet.btstart + ":00").substring(0, 8);
    }
    if (this.timesheet.btend == null) {
    }
    else {
      this.timesheet.btend = (this.timesheet.btend + ":00").substring(0, 8);
    }

    if (this.timesheet.otbtstart == null) {
    }
    else {
      this.timesheet.otbtstart = (this.timesheet.otbtstart + ":00").substring(0, 8);
    }
    if (this.timesheet.otbtend == null) {
    }
    else {
      this.timesheet.otbtend = (this.timesheet.otbtend + ":00").substring(0, 8);
    }

    if (this.timesheet.otstart == null) {
    }
    else {
      this.timesheet.otstart = (this.timesheet.otstart + ":00").substring(0, 8);
    }
    if (this.timesheet.otend == null) {
    }
    else {
      this.timesheet.otend = (this.timesheet.otend + ":00").substring(0, 8);
    }



    this.timesheetService.postTimesheet(this.timesheet).subscribe(data => {
      console.log("saved");
      this.openSnackBar("Saved", "Hide")
    }, error => console.log(error))
    // }
    // else{
    //   this.openSnackBar("Fix Error", "Hide")
    // }

  }
  ////snack bar pop up//////
  openSnackBar(message: string, action: string) {

    let snackRef = this.snackBar.open(message, action, { duration: 1000 });
  }


  /// break checkbox/////
  breakbox(checked: boolean) {
    if (checked == true) {
      console.log("checked");
      this.btShow = true;
      this.timesheet.breakflag = "X";
    }
    else {
      console.log("unchecked");
      this.timesheet.breakflag = "";
      this.btShow = false;
    }
  }

}
