import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/users/`,
     {username: username, password: password});
  }

  loginUser(username:string , password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/users/`,
     {username: username, password: password});
  }
}
