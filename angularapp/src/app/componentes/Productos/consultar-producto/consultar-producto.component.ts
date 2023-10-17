import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductoModel } from 'src/app/modelos/producto.model';
import { ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ConsultaCliente } from 'src/app/modelos/cliente.model';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { Moment } from 'moment';

import Swal from 'sweetalert2'

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import { ProductoService } from 'src/app/servicios/producto.service';

export interface cardsinterface {
  idcard: number;
  cardTitle: string;
  imagecard: string;
  price: number;
}

const ELEMENT_DATA: cardsinterface[] = [
  { idcard: 1, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 2, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 3, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 4, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 5, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 6, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 7, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 8, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 9, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 10, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 11, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 12, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 13, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 14, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 15, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 16, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 17, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 18, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 19, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
  { idcard: 20, cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500 },
];

@Component({
  selector: 'app-consultar-producto',
  templateUrl: './consultar-producto.component.html',
  styleUrls: ['./consultar-producto.component.css']
})
export class ConsultarProductoComponent implements OnInit, AfterViewInit {

  dataSource = ELEMENT_DATA;

  productos: ProductoModel[] = [];
  productosInfo: ProductoModel = new ProductoModel();

  fechaVencimiento: Date | null = null;

  // constructor(private _formBuilder: FormBuilder){}

  productoFormGroupConsulta = this._formBuilder.group({
    codigoProductoControl: [''],
    descripcionProductoControl: [''],
    fechaVencimientoControl: [null],
  })

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private _formBuilder: FormBuilder,
    private productosservice: ProductoService,
  ) {
    this.dateAdapter.setLocale('es')
  }

  ngAfterViewInit(): void {
    this.obtenerListadoProductos();
  }
  ngOnInit(): void {

  }

  obtenerListadoProductos() {
    this.productosservice.obtenerListadoProductos().subscribe(
      (response: ProductoModel[]) => {

        this.productos = response;
        console.log('productos: ', response[0].codigO_PRODUCTO)
      },
      (error) => {
        console.log('Ocurrio un error al obtener los productos.')
      }
    )
  }



  buscarProducto() {
    //   this.datosProducto = []

    //   if (this.productoFormGroupConsulta.valid) {
    //     this.productoservice.obtenerProducto(this.productoFormGroupConsulta.get('codigoProductoControl')?.value || '').subscribe(
    //       (response) => {
    //         // ca50701a-d7cf-4def-b565-3d6c37b60440
    //         this.obtenerEstados();
    //         this.obtenerProveedores();

    //         if (response.length > 0) {
    //           this.datosProducto = response.map((item: any) => {
    //             Object.keys(item).forEach(key => {
    //               if (item[key] === null) item[key] = '';
    //             });
    //             return item;
    //           });

    //           this.imageData = response[0].imagen;

    //           this.productoFormGroup.patchValue({
    //             nombreProductoControl: response[0].nombrE_PRODUCTO,
    //             descripcionProductoControl: response[0].descripcioN_PRODUCTO,
    //             unidadesControl: response[0].unidadeS_EXISTENTES,
    //             estadoProductoControl: response[0].uuiD_ESTADO,
    //             proveedorProductoControl: response[0].codigO_PROVEEDOR,
    //             activoProductoControl: response[0].activo.toString(),
    //             fechaCarga: response[0].fechA_CARGA ? new Date(response[0].fechA_CARGA) : null,  // Utiliza nullish coalescing (??)
    //             fechaIngreso: response[0].fechA_INGRESO ? new Date(response[0].fechA_INGRESO) : null,
    //             fechaVencimiento: response[0].caducidad ? new Date(response[0].caducidad) : null
    //           });

    //           // this.productoFormGroupConsulta.reset()
    //         } else {
    //           Swal.fire({
    //             position: 'top-end',
    //             icon: 'info',
    //             text: 'No existen datos de producto.',
    //             showConfirmButton: false,
    //             timer: 3000,
    //             allowOutsideClick: false
    //           });
    //         }
    //       },
    //       (error) => {
    //         Swal.fire({
    //           position: 'top-end',
    //           icon: 'info',
    //           text: 'Ocurrio un error con el servidor.',
    //           showConfirmButton: false,
    //           timer: 3000,
    //           allowOutsideClick: false
    //         });
    //       }
    //     )
    //   } else {
    //     Swal.fire({
    //       position: 'top-end',
    //       icon: 'info',
    //       text: 'Debe de ingresar el código del producto a buscar.',
    //       showConfirmButton: false,
    //       timer: 2500
    //     });
    //   }
  }




























  // onFechaVencimientoChange(event: any) {
  //   const m: Moment = event.value;
  //   if (m) {
  //     console.log('fecha seleccionada: ', m.toDate());
  //   }
  // }

















  alertaCompra(item: cardsinterface) {

    const inputElement = document.createElement('input');
    inputElement.type = 'number';
    inputElement.min = '1';
    inputElement.value = '1';

    Swal.fire({
      title: item.cardTitle,
      text: 'Precio: Q' + item.price,
      imageUrl: item.imagecard,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: item.cardTitle,
      html: inputElement.outerHTML,
      showCancelButton: true,
      confirmButtonText: 'Agregar al carrito',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const quantity = parseInt(inputElement.value, 10);
        console.log('Cantidad seleccionada:', quantity);
      }
    });

  }


}
