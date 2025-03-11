import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { AddLessonComponent } from './components/add-lesson/add-lesson.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { lessonGuard } from './guard/lesson-guard.guard';
import { RenderMode } from '@angular/ssr';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'addCourse', component: AddCourseComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'lesson/:courseId',
    component: LessonsComponent,
    // canActivate: [lessonGuard],
    // data: { RenderMode: 'dynamic' },
  }, // ביטול Pre-rendering לעמוד זה},
  { path: 'addlesson/:courseId', component: AddLessonComponent },
];
