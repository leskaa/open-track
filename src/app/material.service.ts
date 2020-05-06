import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private _url: string = `${environment.apiUrl}/materials/`;
  constructor(private http: HttpClient) { }

  getMaterials(): Observable<any> {
    return this.http.get(this._url);
  }

  getMaterialById(id): Observable<any> {
    return this.http.get(this._url + id + '/');
  }

  updateMaterial(material): Observable<any> {
    const { material_id, ...body } = material;
    return this.http.put(this._url + material.id + '/', body);
  }

  createMaterial(material): Observable<any> {
    const { material_id, ...body } = material;
    return this.http.post(this._url, body);
  }

  deleteMaterial(id): Observable<any> {
    return this.http.delete(this._url + id + '/');
  }

}
