import { Project } from './project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseGetUrl = "http://localhost:8080/get";
  private basePostUrl = "http://localhost:8080/save";
  private basePutUrl = "http://localhost:8080/put";
  private baseDeleteUrl = "http://localhost:8080/del";
  constructor(private httpClient: HttpClient) { }

  getProjectList(): Observable<Project[]>{
    return  this.httpClient.get<Project[]>(`${this.baseGetUrl}`);
  }

  postProject(project: Project) : Observable<Object>{
    return this.httpClient.post(`${this.basePostUrl}`,project);
  }

  getProjectById(id:number): Observable<Project>
  {
    return this.httpClient.get<Project>(`${this.baseGetUrl}/${id}`);
  }

  updateProject(id:number,project : Project) :Observable<Object>{
    return this.httpClient.put(`${this.basePutUrl}/${id}`,project)
  }

  deleteProject(id:number): Observable<any>
  {
    return this.httpClient.delete(`${this.baseDeleteUrl}/${id}`,{responseType:'text'});
  }
}

  