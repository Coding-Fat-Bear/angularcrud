import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

empgt = new Employee();

  constructor(private employeeService : EmployeeService,
    private router:Router) { }

  ngOnInit(): void {
  }

  getemp(){
    // this.employeeService.getEmployeeByID(this.empgt).subscribe(data =>{
    //   // if(data !== null){
    //     console.log("log success");
    //     this.router.navigate(['/home']);


    // },error =>{
    //   console.log("log error");
    //   this.openSnackBar("Username or Password Invalied","Hide")
    // })
  }

  bckhm(){

    this.router.navigate(['/home']);

  }

}
