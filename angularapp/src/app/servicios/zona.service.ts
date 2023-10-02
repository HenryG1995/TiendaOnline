import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { zonaModel } from '../modelos/zona.model';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  private urlAPI = 'https://localhost:7065/Zonas/';

  constructor(private http: HttpClient) { }

  public obtenerZonasAPI(): Observable<zonaModel[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<zonaModel[]>(this.urlAPI + "ObtenerZonas", { headers: headers });
  }
}
