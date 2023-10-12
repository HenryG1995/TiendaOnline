import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultaCliente, ConsultacodCliente } from '../modelos/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private urlAPI = 'https://localhost:7065/Cliente/';

  constructor(private http: HttpClient) { }

  public GetClient(consulta: ConsultaCliente): Observable<ConsultaCliente[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ConsultaCliente[]>(this.urlAPI + "ConsultaFiltro", consulta, { headers: headers });
  }

  public createClient(clienteData: ConsultaCliente): Observable<ConsultaCliente[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ConsultaCliente[]>(this.urlAPI + "CreaCliente", clienteData, { headers: headers });
  }

  public InfoCliente(codigo: ConsultacodCliente): Observable<ConsultaCliente[]> {
    console.log('codigo: ['+codigo.codigO_CLIENTE+']')

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ConsultaCliente[]>(this.urlAPI + "InfoCliente", codigo, { headers: headers })
  }
}