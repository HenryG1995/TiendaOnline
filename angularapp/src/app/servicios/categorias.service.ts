import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoriasModel } from '../modelos/categorias.model';
import { environment } from 'src/environments/environmet';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  apiUrl = environment.apiUrl + 'CatalogoCategorias/';

  constructor(private http: HttpClient) { }

  public obtenerCategoriasAPI(): Observable<categoriasModel>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<categoriasModel>(this.apiUrl + "GetAllCat", {headers: headers});
  }
}
