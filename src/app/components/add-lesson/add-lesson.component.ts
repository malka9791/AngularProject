import { Component } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../../models/lesson';
import { addLesson } from '../../models/addLesson';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-add-lesson',
  imports: [MatLabel, HeaderComponent],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
 constructor(private courseService: CoursesService,private route:ActivatedRoute) {}
  ngOnInit(): void {

  }

  AddLesson=(title: string, content: string)=> {
    this.route.paramMap.subscribe(params => {
      const courseId = Number(params.get('courseId')); // ממיר את ה-ID למספר
    console.log(courseId);
    
    const lesson= new addLesson(title, content, courseId);
    this.courseService.addLesson(courseId,lesson).subscribe({
      next: (response) => {
        console.log(lesson);
        
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
  });

  }
}
