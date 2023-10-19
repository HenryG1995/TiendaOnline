import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { productoModel } from 'src/app/modelos/producto.model';
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
export class ConsultarProductoComponent implements OnInit {

  dataSource = ELEMENT_DATA;

  productosInfo: productoModel = new productoModel();

  fechaVencimiento : Date | null = null;

  // constructor(private _formBuilder: FormBuilder){}

  // datosFormGroup = this._formBuilder.group({
  //   codigoProducto: [''],
  //   descripcionControl: ['']

  // })

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('es')
  }

  ngOnInit(): void {

  }

  onFechaVencimientoChange(event: any) {
    const m: Moment = event.value;
    if (m) {
      console.log('fecha seleccionada: ', m.toDate());
    }

  }

  alertaCompra(item: cardsinterface) {

        const inputElement = document.createElement('input');
    inputElement.type = 'number';
    inputElement.min = '1'; // Establece un valor mínimo
    inputElement.value = '1'; // Establece un valor inicial

    Swal.fire({
      title: item.cardTitle,
      text: 'Precio: Q' + item.price,
      imageUrl: item.imagecard,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: item.cardTitle,
      html: inputElement.outerHTML, // Agrega el elemento de entrada numérica al contenido HTML de la alerta
      showCancelButton: true,
      confirmButtonText: 'Agregar al carrito',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const quantity = parseInt(inputElement.value, 10); // Obtiene la cantidad ingresada
        // Ahora puedes realizar alguna acción con la cantidad, como agregarla al carrito
        console.log('Cantidad seleccionada:', quantity);
      }
    });

  }



  //////------------------------------------------------------

}
