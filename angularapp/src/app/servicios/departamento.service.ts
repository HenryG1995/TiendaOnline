import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { departamentoModel } from '../modelos/departamento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private urlAPI = 'https://localhost:7065/Departamentos/';

  constructor(private http: HttpClient) { }

  public obtenerDepartamentoAPI(): Observable<departamentoModel>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<departamentoModel>(this.urlAPI + "ObtenerDepartamentos", {headers: headers});
  }
}
