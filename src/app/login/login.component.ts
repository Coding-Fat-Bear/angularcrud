import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../login';
import { LoginService } from '../Services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';

declare const usr:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  // logins : Login[];
  logi = new Login();
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
        this.router.navigate(['/projects']);
        AppComponent.hedoff = false;
        AppComponent.navoff = true;


    },error =>{
      console.log("log error");
      this.openSnackBar("Username or Password Invalied","Hide")
    })
  }

  usrcre(){

    usr();
  }

}
