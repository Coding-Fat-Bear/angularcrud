import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'get';
  navshow : boolean =false;
  static hedoff: boolean;
  static navoff:boolean;
  hedoff = true;
  navoff = false;
}
