import { Injectable } from '@angular/core';
import {Task} from "./task";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    
    
  })
};

@Injectable()
export class TaskService {
  private tasksUrl = 'https://taskmanager697.herokuapp.com/tasks';
  private singleTaskUrl = "https://taskmanager697.herokuapp.com/task";

  constructor(private http: HttpClient) { }

  getTasks (): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl);
  }

  getTask(id: string): Observable<Task> {
    const url = `${this.singleTaskUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  addTask (task: Task): Observable<Task> {
    return this.http.post<Task>(this.singleTaskUrl, task, httpOptions);
      
  }

  updateTask (task: Task): Observable<Task> {
    const url = `${this.singleTaskUrl}/${task._id}`;
    return this.http.put<Task>(url, task, httpOptions);
      
  }

  deleteTask (id: string): Observable<string> {
    const url = `${this.singleTaskUrl}/${id}`;
    
    return this.http.delete(url, {responseType: "text"});
      
  }


  
}
