import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import axios from 'axios';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { log } from 'console';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import {MatSelectModule} from '@angular/material/select';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    HeaderComponent
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  messege = '';
  roles: string[] = ['teacher', 'student', 'admin'];
  constructor(private AuthService: AuthService,private route:Router) {}
  async register() {
    const data = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      role: this.registerForm.get('role')?.value,
    };
    this.route.navigate(['/home']);
    try {
      await this.AuthService.AddUser(data);
      
    } catch (error) {
      console.log(error);
      this.messege = 'failed, try again';
    }
  }
  registerForm: FormGroup<User | any> = new FormGroup({});
  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
      ]),
      role: new FormControl('', [Validators.required]),
    });
  }
  hide: boolean = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
}
