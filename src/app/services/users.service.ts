import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<User[]>('http://localhost:3000/api/users', {
      headers,
    });
  }

  getUserById(id: number): Observable<User> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<User>(`http://localhost:3000/api/users/:${id}`, {
      headers,
    });
  }

  addUser(User: User): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<User>(`http://localhost:3000/api/users`, User, {
      headers,
    });
  }

  updateUser(id: number, User: User): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<User>(`http://localhost:3000/api/users/:${id}`, User, {
      headers,
    });
  }

  deleteUser(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<User>(`http://localhost:3000/api/users/:${id}`, {
      headers,
    });
  }
}
