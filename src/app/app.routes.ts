import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { AddLessonComponent } from './components/add-lesson/add-lesson.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { RenderMode } from '@angular/ssr';
import { addCourseGuard } from './guard/add-course.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'courses', component: CoursesComponent },
  {
    path: 'addCourse',
    component: AddCourseComponent,
    canActivate: [addCourseGuard],
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'lesson/:courseId',
    component: LessonsComponent,
  },
  { path: 'addlesson/:courseId', component: AddLessonComponent },
];
