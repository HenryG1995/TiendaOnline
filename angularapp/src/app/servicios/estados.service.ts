import { Injectable } from '@angular/core';
import { estadosmodel } from '../modelos/estados.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private urlAPI = 'https://localhost:7065/Estados/';
  
  constructor(private http: HttpClient) { }

  public obtenerEstadosAPI(): Observable<estadosmodel[]>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<estadosmodel[]>(this.urlAPI + "GetAllStates", {headers: headers});
  }
}
