import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { paisModel } from '../modelos/pais.model';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private urlAPI = 'https://localhost:7065/Pais/';

  constructor(private http: HttpClient) { }
  
  public obtenerListadoPaisAPI(){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<paisModel>(this.urlAPI + "ObtenerListaPais", {headers: headers});
  }
}
