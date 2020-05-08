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
      withCredentials: true,
    });
  }

  updateProfile(profile: Profile): Observable<Profile> {
    if (
      !(
        profile.image_relative_path.includes(
          'https://www.gravatar.com/avatar/'
        ) ||
        profile.image_relative_path.includes('https://s.gravatar.com/avatar/')
      )
    ) {
      profile.image_relative_path =
        'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200';
    }
    const body = profile;
    return this.http.put<Profile>(this._url + body.user_id + '/', body, {
      headers: new HttpHeaders({
        'X-CSRFToken': this.cookieService.get('csrftoken'),
      }),
      withCredentials: true,
    });
  }

  createProfile(profile: Profile): Observable<Profile> {
    const { user_id, ...body } = profile;
    if (
      !(
        profile.image_relative_path.includes(
          'https://www.gravatar.com/avatar/'
        ) ||
        profile.image_relative_path.includes('https://s.gravatar.com/avatar/')
      )
    ) {
      body.image_relative_path =
        'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200';
    }
    return this.http.post<Profile>(this._url, body, {
      headers: new HttpHeaders({
        'X-CSRFToken': this.cookieService.get('csrftoken'),
      }),
      withCredentials: true,
    });
  }

  deleteProfile(id: number): Observable<Profile> {
    return this.http.delete<Profile>(this._url + id + '/');
  }
}
