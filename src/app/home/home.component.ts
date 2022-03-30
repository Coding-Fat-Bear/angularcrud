import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  tileoff:boolean = true;
  chldtiloff:boolean = false;
  rtnbutoff:boolean = false;

  ngOnInit(): void {
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
