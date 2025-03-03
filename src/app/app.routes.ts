import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CoursesComponent } from './components/courses/courses.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
    {path:"",component:RegisterComponent},
    {path:"login",component:LoginComponent},
    {path:"courses",component:CoursesComponent},
    {path:"users",component:UsersComponent}
];
