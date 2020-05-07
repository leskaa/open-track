import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from './models/Material';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private _url: string = `${environment.apiUrl}/materials/`;
  constructor(private http: HttpClient) {}

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this._url);
  }

  getMaterialById(id): Observable<Material> {
    return this.http.get<Material>(this._url + id + '/');
  }

  updateMaterial(material: Material): Observable<Material> {
    const { material_id, ...body } = material;
    return this.http.put<Material>(this._url + material_id + '/', body);
  }

  createMaterial(material: Material): Observable<Material> {
    const { material_id, ...body } = material;
    return this.http.post<Material>(this._url, body);
  }

  deleteMaterial(id: number): Observable<Material> {
    return this.http.delete<Material>(this._url + id + '/');
  }
}
