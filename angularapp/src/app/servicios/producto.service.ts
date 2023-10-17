import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoModel } from '../modelos/producto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  private URLAPI = 'https://localhost:7065/Inventarios/';

  public crearProducto(obj: ProductoModel): Observable<ProductoModel> {
    return this.http.post<ProductoModel>("https://localhost:7065/Inventarios/GuardaProducto", obj);
  }

  private url = 'https://localhost:7065/Inventarios/ConsultaProducto?'

  public obtenerProducto(id?: string, descripcion?: string, fechaVencimiento?: Date): Observable<ProductoModel[]> {

    if (id?.length) {
      this.url = `${'https://localhost:7065/Inventarios/ConsultaProducto?CODIGO_PRODUCTO='}${id}`;
    }

    console.log('url: [' + this.url + ']')

    return this.http.get<ProductoModel[]>(this.url)
  }

  public obtenerListadoProductos(): Observable<ProductoModel[]> {
    return this.http.get<ProductoModel[]>('https://localhost:7065/Inventarios/GetAllInventario')
  }


}
