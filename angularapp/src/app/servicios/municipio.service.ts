import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { municipioModel } from '../modelos/municipio.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private urlAPI = 'https://localhost:7065/Municipios/';

  constructor(private http: HttpClient) { }

  public obtenerMunicipioAPI(): Observable<municipioModel>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<municipioModel>(this.urlAPI + "ObtenerMunicipios", {headers: headers});
  }
}
