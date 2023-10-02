import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultaCliente } from '../modelos/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private urlAPI = 'https://localhost:7065/Cliente/';

  constructor(private http: HttpClient) { }

  public GetClient(consulta: ConsultaCliente): Observable<datosCliente[]> {
    const requestBody = { codigO_CLIENTE : consulta.codigoCliente }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<datosCliente[]>(this.urlAPI + "InfoCliente", requestBody, { headers: headers });
  }

  public createClient(clienteData: datosCliente): Observable<datosCliente[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('DATOS: ['+clienteData+']');
    return this.http.post<datosCliente[]>(this.urlAPI + "CreaClientes", clienteData, {headers: headers});
  }
}

export interface datosCliente {
  codigO_CLIENTE: string;
  primeR_NOMBRE: string;
  segundO_NOMBRE: string;
  primeR_APELLIDO: string;
  segundO_APELLIDO: string;
  nit: number;
  direccioN_CLIENTE: interfaceDireccion;
  ESTADO: string;
  CATEGORIA: string;
  telefono: number;
}

export interface interfaceDireccion {
  numeral: string;
  type: string;
  zona: string;
  departamento: string;
  municipio: string;
}