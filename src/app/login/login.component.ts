import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../login';
import { LoginService } from '../Services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';
// import { ViewChild } from '@angular/core';

declare const usr:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  // logins : Login[];
  logi = new Login();

  private appcomponent:AppComponent;



  openSnackBar(message: string, action: string){
    let snackRef = this.snackBar.open(message,action,{duration : 5000});
  };

  constructor(private loginService : LoginService,
              private router:Router,
              private snackBar: MatSnackBar ) { }
  uname: string = '';
  ngOnInit(): void {

  }

  login(){

    // console.log(this.logi.username +""+ this.logi.password );

    this.loginService.LoginByUsernameAndPassword(this.logi).subscribe(data =>{
      // if(data !== null){
        console.log("log success");
        this.router.navigate(['/home']);


    },error =>{
      console.log("log error");
      this.openSnackBar("Username or Password Invalied","Hide")
    })
  }

  usrcre(){

    usr();
  }

}
