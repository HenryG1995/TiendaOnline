import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProveedoresModel } from '../modelos/proveedores.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  private urlAPI = 'https://localhost:7065/Proveedores/';

  public obtenerListadoProveedores(){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ProveedoresModel[]>(this.urlAPI + 'GetAll', {headers: headers})
  }

}
