import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { error } from 'console';
import { editCourse } from '../models/editCourse';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Course[]>('http://localhost:3000/api/courses', {
      headers,
    });
  }

  getCourseById(id: number): Observable<Course> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Course>(`http://localhost:3000/api/courses/${id}`, {
      headers,
    });
  }

  addCourse(course: editCourse): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<Course>(`http://localhost:3000/api/courses`, course, {
      headers,
    });
  }

  updateCourse(id: number, course: Course):Observable<any> {
    
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    console.log(headers);
  
   return this.http.put(`http://localhost:3000/api/courses/${id}`, course, { headers });
  
  }

  deleteCourse(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<Course>(
      `http://localhost:3000/api/courses/${id}`,
      { headers }
    );
  }
}
