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

  createTrack(material: Track): Observable<Track> {
    const { track_id, ...body } = material;
    return this.http.post<Track>(this._url, body);
  }

  deleteTrack(id: number): Observable<Track> {
    return this.http.delete<Track>(this._url + id + '/');
  }
}
