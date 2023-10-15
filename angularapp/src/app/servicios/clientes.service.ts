import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultaCliente, ConsultacodCliente, DatosCliente } from '../modelos/cliente.model';

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
    // console.log('codigo: [' + codigo.codigO_CLIENTE + ']')

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ConsultaCliente[]>(this.urlAPI + "InfoCliente", codigo, { headers: headers })
  }

  public actualizarCliente(datos: ConsultaCliente): Observable<ConsultaCliente[]> {
    return this.http.put<ConsultaCliente[]>('https://localhost:7065/Cliente/ActualizaCliente', datos)
  }

  public obtenerCliente(consulta: DatosCliente): Observable<DatosCliente[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<DatosCliente[]>(this.urlAPI + "ConsultaFiltro", consulta, { headers: headers });
  }

  public eliminarCliente(codigo: ConsultacodCliente): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.urlAPI + 'bajaCliente', { headers: headers, body: codigo })
  }
}