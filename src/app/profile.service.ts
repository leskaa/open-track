import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { Profile } from './models/Profile';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _url: string = `${environment.apiUrl}/profiles/`;
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getProfiles(): Observable<Profile> {
    return this.http.get<Profile>(this._url);
  }

  getProfileById(id: number): Observable<Profile> {
    return this.http.get<Profile>(this._url + id + '/', {
      headers: new HttpHeaders({
        'X-CSRFToken': this.cookieService.get('csrftoken'),
      }),
    });
  }

  updateProfile(profile: Profile): Observable<Profile> {
    const { user_id, ...body } = profile;
    return this.http.put<Profile>(this._url + user_id + '/', body);
  }

  createProfile(profile: Profile): Observable<Profile> {
    const { user_id, ...body } = profile;
    return this.http.post<Profile>(this._url, body);
  }

  deleteProfile(id: number): Observable<Profile> {
    return this.http.delete<Profile>(this._url + id + '/');
  }
}
