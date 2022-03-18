import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainmanu',
  templateUrl: './mainmanu.component.html',
  styleUrls: ['./mainmanu.component.css']
})
export class MainmanuComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  timesheetnav(){
    this.router.navigate(['timesheet']);
  console.log("work");
  
  }
}
