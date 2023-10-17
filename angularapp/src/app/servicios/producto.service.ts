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

    console.log('id: ', id, ' desc: ', descripcion, ' fecha: ', fechaVencimiento)

    if (id !== undefined && id.trim() !== '') {
      this.url = `${'https://localhost:7065/Inventarios/ConsultaProducto?CODIGO_PRODUCTO='}${id}`;
    } else if (descripcion !== undefined && descripcion?.trim() !== '') {
      this.url = `${'https://localhost:7065/Inventarios/ConsultaProducto?NOMBRE_PRODUCTO='}${descripcion}`;
    } else if (fechaVencimiento !== undefined && fechaVencimiento !== null) {
      this.url = `${'https://localhost:7065/Inventarios/ConsultaProducto?CADUCIDAD='}${fechaVencimiento}`;
    } else {
      this.url = '';
    }
    console.log('url: ', this.url)
    return this.http.get<ProductoModel[]>(this.url)
  }

  public obtenerListadoProductos(): Observable<ProductoModel[]> {
    return this.http.get<ProductoModel[]>('https://localhost:7065/Inventarios/GetAllInventario')
  }


}


