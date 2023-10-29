import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ventaModelo } from '../modelos/venta.model';
import { ProductoModel } from '../modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private datosVentaSubject: BehaviorSubject<ventaModelo[]> = new BehaviorSubject<ventaModelo[]>([]);
  datosVenta$: Observable<ventaModelo[]> = this.datosVentaSubject.asObservable();

  setDatosVenta(datosVenta: ventaModelo[]) {
    this.datosVentaSubject.next(datosVenta);
  }


  getDatosVenta() {
    return this.datosVentaSubject.value;
  }


  private datosProductoSubject: BehaviorSubject<ProductoModel[]> = new BehaviorSubject<ProductoModel[]>([]);
  datosProducto$: Observable<ProductoModel[]> = this.datosProductoSubject.asObservable();

  setDatosProdcuto(datosProducto: ProductoModel[]) {
    this.datosProductoSubject.next(datosProducto);
  }

  getDatosProducto() {
    return this.datosProductoSubject.value;
  }

  constructor() {

  }

}
