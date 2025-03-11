import { Component, Input, Output,EventEmitter } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Lesson } from '../../models/lesson';
import { MatLabel } from '@angular/material/form-field';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-edit-lesson',
  imports: [MatLabel],
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.css'
})
export class EditLessonComponent {
constructor(private courseService:CoursesService){}

  @Input()
  currentLesson!:Lesson;
  @Output() newLesson:EventEmitter<Lesson>=new EventEmitter<Lesson>();
  saveData(title:string,content:string,CourseId:number)
  {
    const l1=new Lesson(this.currentLesson.id,title,content,CourseId);
    this.newLesson.emit(l1)
    
  }
}
