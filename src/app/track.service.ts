import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Track } from './models/Track';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private _url: string = `${environment.apiUrl}/tracks/`;
  constructor(private http: HttpClient) {}

  getTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(this._url);
  }

  getTrackById(id): Observable<Track> {
    return this.http.get<Track>(this._url + id + '/');
  }

  updateTrack(track: Track): Observable<Track> {
    const { track_id, ...body } = track;
    return this.http.put<Track>(this._url + track_id + '/', body);
  }

  createTrack(track: Track): Observable<Track> {
    const { track_id, ...body } = track;
    return this.http.post<Track>(this._url, body);
  }

  deleteTrack(id: number): Observable<Track> {
    return this.http.delete<Track>(this._url + id + '/');
  }

  getRatings(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/track_ratings/`);
  }

  createRating(
    stars: number,
    user_id: number,
    track_id: number
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/track_ratings/`, {
      rating: stars,
      user_fk: user_id,
      track_fk: track_id,
    });
  }

  deleteRating(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/track_ratings/${id}`);
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/track_favorites/`);
  }

  createFavorite(user_id: number, track_id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/track_favorites/`, {
      user_fk: user_id,
      track_fk: track_id,
    });
  }

  deleteFavorite(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/track_favorites/${id}`);
  }
}
