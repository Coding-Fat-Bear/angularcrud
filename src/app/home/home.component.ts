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

  timesheetnav(){
    this.router.navigate(['timesheet',this.id]);
  console.log("work");
  
  }
}
