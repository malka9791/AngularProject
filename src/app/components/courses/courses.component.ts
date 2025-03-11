import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course';
import { Router } from '@angular/router';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-courses',
  imports: [EditCourseComponent, HeaderComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  constructor(private courseService: CoursesService, private route: Router) {}
  list: Course[] = [];
  messege!: string;
  currentIdForEdit!: number;

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.list = courses;
    });
  }
  edit(id: number) {
    this.currentIdForEdit = id;
    // this.route.navigate([`/courses/:${Course.id}`])
    this.messege = '';
  }
  Delete(id: number): void {
    this.courseService.deleteCourse(id).subscribe({
      next: (response) => {
        console.log('success delete');
        this.list = this.list.filter((lesson) => lesson.id !== id);
      },
      error: (err) => {
        if (err.status === 403) {
          debugger;
          console.log('you cannt delete');
        } else {
          console.error('שגיאה בעדכון הקורס:', err);
        }
      },
    });
  }

  save(e: any) {
    this.courseService.updateCourse(e.id, e).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.courseService.getCourses().subscribe((courses) => {
          this.list = courses;
        });

        this.currentIdForEdit = -1;
      },
      error: (err) => {
        if (err.status === 403) {
          this.messege = 'אין לך הרשאה לעדכן את הקורס.';
        } else {
          (this.messege = 'שגיאה בעדכון הקורס:'), err;
        }
      },
    });
  }
  canChange = () => {
    let role =
      typeof window !== 'undefined' && typeof localStorage !== 'undefined'
        ? localStorage.getItem('role')
        : null;
    if (role == 'student') return false;
    return true;
  };
  showLessons = (id: number) => {
    this.route.navigate([`lesson/`,id]);
  };
  addLesson(id: number): void {
    this.route.navigate([`addlesson/`,id]);
  }
  joinCourse(courseId: number): void {
    let id = this.courseService.getIdFromToken();
    if (!id) {
      console.error('No token or userId found');
      return;
    }
    this.courseService.addStudentToCourse(courseId, id).subscribe(
      (response) => {
        console.log('you joined successfully:', response);
        alert('נרשמת בהצלחה לקורס!');
      },
      (error) => {
        console.error('Error joining course:', error);
        alert('הנך רשום כבר לקורס זה');
      }
    );
  }

  LeaveCourse(courseId: number): void {
    let id = this.courseService.getIdFromToken();
    this.courseService.removeStudentFromCourse(courseId, id).subscribe(
      (response) => {
        console.log('You left successfully:', response);
        alert('You left successfully');
      },
      (error) => {
        console.error('Error leaving course:', error);
      }
    );
  }
}
