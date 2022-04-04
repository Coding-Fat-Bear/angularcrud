import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { LoginService } from '../Services/login.service';
// import { Console } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginservice : LoginService,
    private router:Router,private route :ActivatedRoute) { }



  tileoff:boolean = true;
  chldtiloff:boolean = false;
  rtnbutoff:boolean = false;

  huname:String
  hpword:String

  ngOnInit(): void {
    
  }

  @HostListener('contextmenu', ['$event'])
  onLeftClick(_event){
      alert("Left click is working");
  }


  emptile(){
    this.tileoff = !this.tileoff;
    this.chldtiloff = !this.chldtiloff;
    this.rtnbutoff = !this.rtnbutoff;

  }

  retn(){
    this.tileoff = !this.tileoff;
    this.chldtiloff = !this.chldtiloff;
    this.rtnbutoff = !this.rtnbutoff;

  }

  empcre(){
    this.router.navigate(['/employee']);
  }

}
