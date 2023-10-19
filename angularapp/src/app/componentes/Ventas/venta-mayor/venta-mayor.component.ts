import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2'


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
  selector: 'app-venta-mayor',
  templateUrl: './venta-mayor.component.html',
  styleUrls: ['./venta-mayor.component.css']
})
export class VentaMayorComponent {

  dataSource = ELEMENT_DATA;



  alertaCompra(item: cardsinterface) {

    // Swal.fire({
    //   title: 'Enter the amount',
    //   html: '<duet-number-input value="0" min="-999999" step="1" unit="€" />',
    //   didOpen: () => {
    //     const input = Swal.getContainer()?.querySelector('duet-number-input') as HTMLInputElement | null;
    //     if (input) {
    //       input.addEventListener('duetChange', (e: Event) => {
    //         const customEvent = e as CustomEvent;
    //         const value = parseInt(customEvent.detail.value, 10); // Convierte el valor a un número entero
            
    //         const confirmButton = Swal.getConfirmButton();
    //         if (confirmButton) {
    //           confirmButton.disabled = value < 0;
    //         }
    //       });
    //     }
    //   },
    //   preConfirm: () => {
    //     const input = Swal.getContainer()?.querySelector('duet-number-input') as HTMLInputElement | null;
    //     if (input) {
    //       const value = parseInt(input.value, 10); // Convierte el valor a un número entero
    //       return value < 0 ? Swal.showValidationMessage('Please enter a positive value') : value;
    //     }
    //     return null;
    //   },
    // }).then(function (result) {
    //   if (result.isConfirmed) {
    //     Swal.fire(`Entered amount: ${result.value}`);
    //   }
    // });
    
    
    
    
    
    


    // const inputElement = document.createElement('input');
    // inputElement.type = 'number';
    // inputElement.min = '1'; // Establece un valor mínimo
    // inputElement.value = '1'; // Establece un valor inicial

    // Swal.fire({
    //   title: item.cardTitle,
    //   text: 'Precio: Q' + item.price,
    //   imageUrl: item.imagecard,
    //   imageWidth: 400,
    //   imageHeight: 300,
    //   imageAlt: item.cardTitle,
    //   html: inputElement.outerHTML, // Agrega el elemento de entrada numérica al contenido HTML de la alerta
    //   showCancelButton: true,
    //   confirmButtonText: 'Agregar al carrito',
    //   cancelButtonText: 'Cancelar',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     const quantity = parseInt(inputElement.value, 10); // Obtiene la cantidad ingresada
    //     // Ahora puedes realizar alguna acción con la cantidad, como agregarla al carrito
    //     console.log('Cantidad seleccionada:', quantity);
    //   }
    // });



    //   Swal.fire({
    //     title: item.cardTitle,
    //     text: 'Precio: Q' + item.price,
    //     imageUrl: item.imagecard,
    //     imageWidth: 400,
    //     imageHeight: 300,
    //     imageAlt: item.cardTitle,
    //   })
  }
}
