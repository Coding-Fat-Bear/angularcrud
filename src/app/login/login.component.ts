import { Component, OnInit } from '@angular/core';
import { Login } from '../login';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  // logins : Login[];
  logi = new Login();

  constructor(private loginService : LoginService ) { }
  uname: string = '';
  ngOnInit(): void {

  }

  login(){

    // console.log(this.logi.username +""+ this.logi.password );

    this.loginService.LoginByUsernameAndPassword(this.logi).subscribe(data =>{
      // if(data !== null){
        console.log("log success");


    },error =>{
      console.log("log error");
    })
  }

}
