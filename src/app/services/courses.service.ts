import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Course } from '../models/course';
import { error } from 'console';
import { editCourse } from '../models/editCourse';
import { Lesson } from '../models/lesson';
import { addLesson } from '../models/addLesson';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}
  token =
    typeof window !== 'undefined' && typeof localStorage !== 'undefined'
      ? localStorage.getItem('token')
      : '';
  getCourses(): Observable<Course[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<Course[]>('http://localhost:3000/api/courses', {
      headers,
    });
  }

  getCourseById(id: number): Observable<Course> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<Course>(`http://localhost:3000/api/courses/${id}`, {
      headers,
    });
  }

  addCourse(course: editCourse): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post<Course>(`http://localhost:3000/api/courses`, course, {
      headers,
    });
  }

  updateCourse(id: number, course: Course): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
      .set('Content-Type', 'application/json');
    console.log(headers);

    return this.http.put(`http://localhost:3000/api/courses/${id}`, course, {
      headers,
    });
  }

  deleteCourse(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.delete<Course>(`http://localhost:3000/api/courses/${id}`, {
      headers,
    });
  }
  //lessons
  addLesson(courseId: number, lesson: addLesson): Observable<any> {
    console.log(lesson, courseId, 'in add');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post<Course>(
      `http://localhost:3000/api/courses/${courseId}/lessons`,
      lesson,
      {
        headers,
      }
    );
  }
  deleteLesson(courseId: number, id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.delete(
      `http://localhost:3000/api/courses/${courseId}/lessons/${id}`,
      { headers }
    );
  }
  getLessonsById(id: number): Observable<Lesson[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<Lesson[]>(
      `http://localhost:3000/api/courses/${id}/lessons`,
      {
        headers,
      }
    );
  }
  updateLesson(courseId: number, id: number, lesson: Lesson): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
      .set('Content-Type', 'application/json');
    console.log(headers);

    return this.http.put(
      `http://localhost:3000/api/courses/${courseId}/lessons/${id}`,
      lesson,
      { headers }
    );
  }
  //id from token
  getIdFromToken() {
    let token2 = this.token;
    try {
      if (token2 != null) {
        const payloadBase64 = token2.split('.')[1]; // החלק האמצעי של ה- JWT
        const payloadJson = atob(payloadBase64); // המרת Base64 ל- JSON
        const payload = JSON.parse(payloadJson); // המרת JSON לאובייקט
        console.log(payload);

        return payload.userId || null; // החזרת ה-role אם קיים
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  //leave and join course

  addStudentToCourse(courseId: number, userId: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
      .set('Content-Type', 'application/json');
    return this.http
      .post(
        `http://localhost:3000/api/courses/${courseId}/enroll`,
        { userId },
        {
          headers,
        }
      )
      .pipe(
        catchError((error) => {
          console.error('Error enrolling student in course:', error);
          return throwError(error);
        })
      );
  }

  removeStudentFromCourse(courseId: number, userId: number): Observable<any> {
    // const headers = new HttpHeaders().set(
    //   'Authorization',
    //   `Bearer ${this.token}`
    // );
    // .set('Content-Type', 'application/json');
    return this.http.request<any>('DELETE', `http://localhost:3000/api/courses/${courseId}/unenroll`, {
      body: { userId: userId },
    });
  }
  
}
