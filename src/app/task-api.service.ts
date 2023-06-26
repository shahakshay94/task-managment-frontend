import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  private apiUrl = 'http://localhost:3535/tasks';
  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getTask(taskId: string): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.get<any>(url);
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  updateTask(taskId: string | undefined, task: any): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.patch<any>(url, task);
  }

  deleteTodo(taskId: string | undefined): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<any>(url);
  }
}
