import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '@piano-task-list/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(task: Task): Observable<Task> {
    console.log("CREEATE TASK");
    return this.http.post<Task>(this.apiUrl, task);
  }
}
