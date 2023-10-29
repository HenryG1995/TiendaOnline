import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environmet';
import { ventaModelo } from '../modelos/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private uri = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public realizarVenta(datos: ventaModelo[]): Observable<any>{
    return this.http.post<any>(this.uri + 'Ventas/Venta', datos)
  }

  public anularVenta(codigo: string):Observable<any>{
    return this.http.post(this.uri + 'Ventas/Cancelar?CODIGO_VENTA=' + codigo, codigo)
  }

  public devolucion(codigo: string):Observable<any>{
    return this.http.post(this.uri + 'Ventas/Devolucion?CODIGO_VENTA=' + codigo, codigo)
  }

}
