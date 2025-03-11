import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course } from '../models/course';
import { editCourse } from '../models/editCourse';
import {  MatLabel } from '@angular/material/form-field';
import { HeaderComponent } from "../components/header/header.component";

@Component({
  selector: 'app-edit-course',
  imports: [MatLabel],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {
 constructor(private courseService:CoursesService){}

  @Input()
  currentCourse!:Course;
  @Output() newCourse:EventEmitter<Course>=new EventEmitter<Course>();
  saveData(title:string,description:string,Teacherid:number)
  {
    const c1=new Course(this.currentCourse.id,title,description,Teacherid);
    this.newCourse.emit(c1)
    console.log(c1,"c1");
    
  }

}
