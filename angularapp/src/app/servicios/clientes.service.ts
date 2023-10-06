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

  public GetClient(consulta: ConsultaCliente): Observable<ConsultaCliente[]> {
    const requestBody = { codigO_CLIENTE : consulta.CODIGO_CLIENTE }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ConsultaCliente[]>(this.urlAPI + "InfoCliente", requestBody, { headers: headers });
  }

  public createClient(clienteData: ConsultaCliente): Observable<ConsultaCliente[]>{
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('DATOS: [ CODIGO: '+clienteData.CODIGO_CLIENTE
      +' NOMBRE: '+ clienteData.PRIMER_NOMBRE + ' ' + clienteData.SEGUNDO_NOMBRE + ' ' + clienteData.PRIMER_APELLIDO + ' ' + clienteData.SEGUNDO_APELLIDO
      + ' nit: ' + clienteData.NIT + ' DIRECCION ' + clienteData.DIRECCION_CLIENTE
      + ' ESTADO: ' + clienteData.CODIGO_ESTADO + ' CATEGORIA: ' + clienteData.CODIGO_CATEGORIA + ' TEL ' + clienteData.TELEFONO+' ]');
    return this.http.post<ConsultaCliente[]>(this.urlAPI + "CreaCliente", clienteData, {headers: headers});
  }
}

export interface datosCliente {
  codigO_CLIENTE: string;
  primeR_NOMBRE: string;
  segundO_NOMBRE: string;
  primeR_APELLIDO: string;
  segundO_APELLIDO: string;
  nit: string;
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