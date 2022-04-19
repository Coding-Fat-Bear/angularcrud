
import { TimesheetComponent } from './timesheet/timesheet.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { MonthsheetComponent } from './monthsheet/monthsheet.component';


const routes: Routes = [
  {path:'projects',component: ProjectListComponent},
  {path:'create',component: CreateProjectComponent},
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'update/:id',component: UpdateProjectComponent},
  {path:'timesheet/:id',component: TimesheetComponent},
  {path:'login',component: LoginComponent},
  {path:'employee',component: EmployeeComponent},
  {path:'home/:id',component: HomeComponent},
  {path:'monthsheet/:id/:year/:month',component: MonthsheetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
