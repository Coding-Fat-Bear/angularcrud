import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from './../project.service';
import { Component, OnInit } from '@angular/core';
import { Project } from '../project';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  id : number;
  project = new Project();
  constructor(private projectService : ProjectService,
    private route :ActivatedRoute,
    private router : Router) { }

    onSubmit(){
      this.projectService.updateProject(this.id,this.project).subscribe(data =>{
        this.goToList();
      },error => console.log(error))
    }

  ngOnInit(): void {
    console.log(this.route);
    this.id = this.route.snapshot.params['id'];
    this.projectService.getProjectById(this.id).subscribe(data =>{
      this.project = data;
    },error => console.log(error));
    
  }
  goToList()
  {
    this.router.navigate(['/projects']);
  }

}
