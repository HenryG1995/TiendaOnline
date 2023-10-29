import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VentaService } from 'src/app/servicios/venta.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-entrega',
  templateUrl: './ingreso-entrega.component.html',
  styleUrls: ['./ingreso-entrega.component.css']
})
export class IngresoEntregaComponent implements OnInit, OnDestroy {
  isLoading = false

  private subscription?: Subscription[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private ventaServicio: VentaService
  ) { }

  ngOnInit(): void {
    window.addEventListener('beforeunload', () => {
      this.isLoading = true;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  codigoventa = this._formBuilder.group({
    codigo: ['', Validators.required]
  })

  ingreso() {
    if (this.codigoventa.valid) {

      Swal.fire(
        'Entrega',
        '¿Está seguro que desea realizar la entrega de productos?',
        'question'
      ).then((e) => {
        if (e.isConfirmed) {
          this.ingresoEntrega();
        }
      })
    }
  }

  ingresoEntrega() {

    this.subscription?.push(
      this.ventaServicio.entrega(this.codigoventa.get('codigo')?.value ?? '').subscribe(
        (resonse) => {
          this.isLoading = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'Entrega exitosa.',
            showConfirmButton: true,
            allowOutsideClick: false,
          }).then((e) => {
            if (e.isConfirmed) {
              window.location.reload();
            }
          })
        },
        (error) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            text: 'Ocurrio un error al realizar entrega.',
            showConfirmButton: true,
            allowOutsideClick: false,
          })
        }
      )
    )
  }


  errorServidor() {
    this.isLoading = false;
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      text: 'Ocurrio un error con el servidor.',
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2500
    })
  }
}
