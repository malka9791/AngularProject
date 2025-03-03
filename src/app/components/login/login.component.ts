import { Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import axios from 'axios';
import { Login } from '../../models/login';
import { AuthService } from '../../services/auth.service';
import { log } from 'console';
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  messege = '';
  constructor(private AuthService: AuthService) {}
  async PostData() {
    try {
      await this.AuthService.Login({
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      });
      console.log('success');
    } catch (err: any) {
      this.messege = 'no such user';
    }
  }

  loginForm: FormGroup<Login | any> = new FormGroup({});
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
      ]),
    });
  }
  hide: boolean = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
}
