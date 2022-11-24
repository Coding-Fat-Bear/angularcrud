import { Inquiry } from './../inquiry';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route :ActivatedRoute,
          private router:Router) { }

  tileoff:boolean = true;
  chldtiloff:boolean = false;
  rtnbutoff:boolean = false;
  id :any;
  year :any = 2022;
  month :any = 3;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
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

  Inquiry(){
    this.router.navigate(['/inquiry']);
  }

  timesheetnav(){
    this.router.navigate(['timesheet',this.id]);
  
  }
  monthsheetnav(){
    this.router.navigate(['monthsheet',this.id,this.year,this.month]);
  }
}
