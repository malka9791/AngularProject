import { Component, OnInit } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course';
import { editCourse } from '../../models/editCourse';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-add-course',
  imports: [MatLabel, HeaderComponent],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
})
export class AddCourseComponent implements OnInit {
  constructor(private courseService: CoursesService) {}
  ngOnInit(): void {}

  AddCourse(title: string, description: string) {
    const c1 = new editCourse(title, description);
    this.courseService.addCourse(c1).subscribe({
      next: (response) => {
        console.log(c1);

        console.log('Success:', response);
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
