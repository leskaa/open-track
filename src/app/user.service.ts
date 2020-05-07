import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/User';
import { environment } from './../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  username: string = '';
  token: string = '';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  registerUser(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/rest-auth/registration/`, {
      username: username,
      password1: password,
      password2: password,
    });
  }

  loginUser(username: string, password: string): Observable<any> {
    const response = this.http.post(`${environment.apiUrl}/rest-auth/login/`, {
      username: username,
      password: password,
    });
    console.log(
      response.subscribe(
        (response) => {
          this.token = response['key'];
          this.username = username;
        },
        (error) => {
          console.log('error', error);
        }
      )
    );
    return response;
  }

  logoutUser(): Observable<any> {
    this.username = '';
    this.token = '';
    return this.http.post(`${environment.apiUrl}/rest-auth/logout/`, {});
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/rest-auth/user/`, {
      headers: new HttpHeaders({
        'X-CSRFToken': this.cookieService.get('csrftoken'),
      }),
    });
  }

  getToken(): string {
    return this.token;
  }

  isLoggedIn(): boolean {
    return this.username !== '';
  }
}
