import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquiryComponent } from './inquiry/inquiry.component';
import { CreateInquiryComponent } from "./create-inquiry/create-inquiry.component";

const routes: Routes = [
  { path: 'inquiry', component: InquiryComponent },
  { path: 'create', component: CreateInquiryComponent },
  { path: '', redirectTo: 'inquiry', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
