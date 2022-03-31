import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent implements OnInit {
  title = 'PIMS';
  active = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
