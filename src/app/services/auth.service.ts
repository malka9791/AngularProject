import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginRes } from '../models/loginRes';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  async Login(login: Login) {
    try {
      const res = await firstValueFrom(
        this.http.post<LoginRes>('http://localhost:3000/api/auth/login', {
          email: login.email,
          password: login.password,
        })
      );
      if (res?.token) {
        localStorage.setItem('token', res.token);
        const role = this.getRoleFromToken(res.token);
        localStorage.setItem('role', role);
      }
    } catch (err: any) {
      throw 'error';
    }
  }

  async AddUser(user: User) {
    try {
      const res = await firstValueFrom(
        this.http.post<LoginRes>('http://localhost:3000/api/auth/register', {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        })
      );
      if (res?.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', user.role);
      }
    } catch (err: any) {
      throw 'error';
    }
  }
  getRoleFromToken(token: string): string | '' {
    try {
      const payloadBase64 = token.split('.')[1]; // החלק האמצעי של ה- JWT
      const payloadJson = atob(payloadBase64); // המרת Base64 ל- JSON
      const payload = JSON.parse(payloadJson); // המרת JSON לאובייקט
      return payload.role || null; // החזרת ה-role אם קיים
    } catch (error) {
      console.error('Error decoding token:', error);
      return '';
    }
  }
}
