import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  
  private urlGetAllClients= 'https://localhost:7065/Cliente/GetAllClient';
  private urlGetAllCat = 'https://localhost:7065/CatalogoCategorias/GetAllCat';

  constructor(private http: HttpClient) { }

  public getAllClients(): Observable<cliente[]> {
    return this.http.get<cliente[]>(`${this.urlGetAllClients}`);
  }

  public getAllCat(): Observable<categoria[]> {
    return this.http.get<categoria[]>(this.urlGetAllCat);
  }


}


export interface cliente {
  codigo_cliente: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  nit: number;
  direccion_cliente: string;
  estado: string;
  categoria: string;
  telefono: number;
}

export interface categoria {
  codigo: number;
  nombre: string;
  activo: number;
}
