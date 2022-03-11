import { Router } from '@angular/router';
import { ProjectService } from './../project.service';
import { Component, OnInit } from '@angular/core';
import { Project} from '../project'
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects : Project[];
  filter  : {
    keyword:''
  }
  constructor(private projectService: ProjectService,
    private router : Router) {

   }

  ngOnInit(): void {
    this.getProject();
  }
  private getProject(){
    this.projectService.getProjectList().subscribe(data =>{
      this.projects = data;
    })
  }

  updateProject(id: number){
    this.router.navigate(['update',id]);
  }

  deleteProject(id:number){
    this.projectService.deleteProject(id).subscribe( data =>{
      console.log(data);   
    this.getProject();
    })
  }
  filterProject(){
    
  }

}
