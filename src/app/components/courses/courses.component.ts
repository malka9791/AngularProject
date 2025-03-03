import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{ 
  constructor(private courseService:CoursesService){}
  list:Course[]=[];
  
  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.list = courses;  
    });
  }
 
}
