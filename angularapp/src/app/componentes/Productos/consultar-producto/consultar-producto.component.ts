import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductoModel } from 'src/app/modelos/producto.model';
import { DateAdapter } from '@angular/material/core';

import Swal from 'sweetalert2'
// import * as _moment from 'moment';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-consultar-producto',
  templateUrl: './consultar-producto.component.html',
  styleUrls: ['./consultar-producto.component.css']
})
export class ConsultarProductoComponent implements OnInit, AfterViewInit {

  productos: ProductoModel[] = [];
  fechaVencimiento: Date | null = null;


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

  alertaCompra(item: ProductoModel) {

    const inputElement = document.createElement('input');
    inputElement.type = 'number';
    inputElement.min = '1';
    inputElement.value = '1';

    Swal.fire({
      title: item.nombrE_PRODUCTO,
      text: 'Precio: Q' + item.unidadeS_EXISTENTES,
      imageUrl: item.imagen,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: item.descripcioN_PRODUCTO,
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


  buscarProducto() {
      this.productos = []

      if (this.productoFormGroupConsulta.valid) {
        const id = this.productoFormGroupConsulta.get('codigoProductoControl')?.value ?? ''
        const desc = this.productoFormGroupConsulta.get('descripcionProductoControl')?.value ?? ''
        const vencimiento = this.productoFormGroupConsulta.get('fechaVencimientoControl')?.value ?? undefined


        this.productosservice.obtenerProducto(id, desc, vencimiento).subscribe(
          (response) => {
            // ca50701a-d7cf-4def-b565-3d6c37b60440
            if (response.length > 0) {
              this.productos = response.map((item: any) => {
                Object.keys(item).forEach(key => {
                  if (item[key] === null) item[key] = '';
                });
                return item;
              });


            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'info',
                text: 'No existen datos de producto.',
                showConfirmButton: false,
                timer: 3000,
                allowOutsideClick: false
              });
            }
          },
        )
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          text: 'Debe de ingresar el código del producto a buscar.',
          showConfirmButton: false,
          timer: 2500
        });
      }
  }

  // onFechaVencimientoChange(event: any) {
  //   const m: Moment = event.value;
  //   if (m) {
  //     console.log('fecha seleccionada: ', m.toDate());
  //   }
  // }

}
