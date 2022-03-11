import { ProjectService } from './../project.service';
import { Project } from './../project';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  project : Project = new Project();
  constructor(private projectService : ProjectService,
      private router : Router) {}

  saveProject(){
    this.projectService.postProject(this.project).subscribe(data =>{
      console.log(data);
      this.goToList();
    },
    error =>  console.log(this.project)
    );
  }
  goToList()
  {
    this.router.navigate(['/projects']);
  }
  onSubmit(){
    console.log(this.project);
    this.saveProject();
  }

  ngOnInit(): void {
  }

}
