import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course';
import { Router } from '@angular/router';
import { EditCourseComponent } from '../../edit-course/edit-course.component';

@Component({
  selector: 'app-courses',
  imports: [EditCourseComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  constructor(private courseService: CoursesService, private route: Router) {}
  list: Course[] = [];
  currentIdForEdit!: number;

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.list = courses;
    });
  }
  changeList()
  {
    this.courseService.getCourses().subscribe((courses) => {
      this.list = courses;
    });
  }
  edit(id: number) {
    this.currentIdForEdit = id;
    // this.route.navigate([`/courses/:${Course.id}`])
  }
  delete(id: number) {
    this.courseService.deleteCourse(id).subscribe({
      next: (response) => {
        console.log('success delete');
        this.changeList();
      },
      error: (err) => {
        if (err.status === 403) {
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
        this.changeList();
        this.currentIdForEdit = -1;
      },
      error: (err) => {
        if (err.status === 403) {
          console.log('אין לך הרשאה לעדכן את הקורס.');
        } else {
          console.error('שגיאה בעדכון הקורס:', err);
        }
      },
    });
  }
}
