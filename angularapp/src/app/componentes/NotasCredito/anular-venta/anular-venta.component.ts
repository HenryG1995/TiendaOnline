import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VentaService } from 'src/app/servicios/venta.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-anular-venta',
  templateUrl: './anular-venta.component.html',
  styleUrls: ['./anular-venta.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: '*', opacity: 0 }),
            animate('500ms ease-in-out')
          ]
        ),

      ]
    )
  ]
})
export class AnularVentaComponent implements OnInit, OnDestroy {

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

  eliminar() {
    if (this.codigoventa.valid) {

      Swal.fire(
        'Eliminar venta',
        '¿Está seguro que desea eliminar la venta?',
        'question'
      ).then((e) => {
        if (e.isConfirmed) {
          this.eliminaVenta();
        }
      })
    }
  }

  eliminaVenta() {

    this.subscription?.push(
      this.ventaServicio.anularVenta(this.codigoventa.get('codigo')?.value ?? '').subscribe(
        (resonse) => {
          this.isLoading = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'Venta eliminada exitosamente.',
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
            text: 'Ocurrio un error al eliminar la venta.',
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
