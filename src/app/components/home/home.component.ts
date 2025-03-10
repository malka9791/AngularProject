import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { CoursesComponent } from "../courses/courses.component";
import { EditCourseComponent } from "../../edit-course/edit-course.component";
import { AddCourseComponent } from '../add-course/add-course.component';
@Component({
  selector: 'app-home',
  imports: [RouterOutlet, MatTabsModule, MatIconModule, CoursesComponent, AddCourseComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
