import { Component, Input, Output } from '@angular/core';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  fechaVencimiento: Date | null = null;

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('es')
  }

  onFechaVencimientoChange(event: any) {
    const m: Moment = event.value;
    if (m) {
      console.log('fecha seleccionada: ', m.toDate());
    }

  }

}
