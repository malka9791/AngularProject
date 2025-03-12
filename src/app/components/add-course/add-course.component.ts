import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CoursesService } from '../../services/courses.service';
import { editCourse } from '../../models/editCourse';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-add-course',
  imports: [HeaderComponent, MatLabel],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
})
export class AddCourseComponent {
  constructor(private courseService: CoursesService) {}
  ngOnInit(): void {}
  messege!: string;
  AddCourse(title: string, description: string) {
    const c1 = new editCourse(title, description);
    this.courseService.addCourse(c1).subscribe({
      next: (response) => {
        this.messege = 'succes add a course!!';
      },
      error: (err) => {
        if (err.status === 403) {
          console.log('אין לך הרשאה להוסיף את הקורס.');
        } else {
          console.error('שגיאה בהוספת הקורס:', err);
        }
      },
    });
  }
}
