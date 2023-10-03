import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';

export interface cardsinterface {
  cardTitle: string;
  imagecard: string;
  price: number;
}

const ELEMENT_DATA: cardsinterface[] = [
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
  {cardTitle: 'Shiba Inu', imagecard: 'https://material.angular.io/assets/img/examples/shiba2.jpg', price: 1500},
];

@Component({
  selector: 'app-venta-mayor',
  templateUrl: './venta-mayor.component.html',
  styleUrls: ['./venta-mayor.component.css']
})
export class VentaMayorComponent {

  dataSource = ELEMENT_DATA;
}
