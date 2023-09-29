import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface direccionInterface {
  numeral: string;
  tdireccion: string;
  zona: string;
  departamento: string;
  municipio: string
}

const ELEMENT_DATA: direccionInterface[] = [
  { numeral: '6ta avenida', tdireccion: 'casa', zona: '10', departamento: 'Guatemala', municipio: 'Guatemala' },
  { numeral: '6ta avenida', tdireccion: 'casa', zona: '10', departamento: 'Guatemala', municipio: 'Guatemala' },
];

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css']
})
export class EliminarClienteComponent {
  isTableEmpty = true;

  displayedColumns: string[] = ['numeral', 'tdireccion', 'zona', 'departamento', 'municipio'];
  dataSource = ELEMENT_DATA;
}
