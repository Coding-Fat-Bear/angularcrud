import { TimesheetComponent } from './timesheet/timesheet.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { InquiryComponent } from './inquiry/inquiry.component'

const routes: Routes = [
  {path:'projects',component: ProjectListComponent},
  {path:'create',component: CreateProjectComponent},
  {path:'', redirectTo:'projects',pathMatch:'full'},
  {path:'update/:id',component: UpdateProjectComponent},
  {path:'timesheet',component: TimesheetComponent},
  {path:'inquiry', component: InquiryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
