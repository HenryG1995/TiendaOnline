import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoriasModel } from '../modelos/categorias.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private urlAPI = 'https://localhost:7065/CatalogoCategorias/';

  constructor(private http: HttpClient) { }

  public obtenerCategoriasAPI(): Observable<categoriasModel>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<categoriasModel>(this.urlAPI + "GetAllCat", {headers: headers});
  }
}
