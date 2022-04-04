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

  logins : Login[];
  logi = new Login();
  lusername:String
  lpassword:String
  private appcomponent:AppComponent;



  openSnackBar(message: string, action: string){
    let snackRef = this.snackBar.open(message,action,{duration : 5000});
  };

  constructor(private loginService : LoginService,
              private router:Router,
              private snackBar: MatSnackBar ) { }

  ngOnInit(): void {

  }

  login(){


    let data:any = this.logi;
    this.loginService.LoginByUsernameAndPassword(this.logi).subscribe(data =>{

        this.lusername = this.logi.username;
        this.lpassword = this.logi.password;
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
