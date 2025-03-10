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
  async Login(login: Login){
    try {
      const res = await firstValueFrom(
        this.http.post<LoginRes>('http://localhost:3000/api/auth/login', {
          email: login.email,
          password: login.password,
        })
      );
      if (res?.token) {
        localStorage.setItem('token', res.token);
      }
    } catch (err: any) {
      throw 'error';
    }
  }

  async AddUser(user: User){
    try {
       const res=await firstValueFrom(this.http.post<LoginRes>('http://localhost:3000/api/auth/register', {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        }));
        if (res?.token) {
          localStorage.setItem('token', res.token);
        } 
    } catch (err: any) {
      throw 'error';
    }
  }
  
}
