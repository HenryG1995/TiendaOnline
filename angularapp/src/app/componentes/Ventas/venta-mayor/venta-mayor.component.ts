import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductoModel } from 'src/app/modelos/producto.model';
import { ventaModelo } from 'src/app/modelos/venta.model';
import { DataSharingService } from 'src/app/servicios/data-sharing.service';
import { VentaService } from 'src/app/servicios/venta.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-venta-mayor',
  templateUrl: './venta-mayor.component.html',
  styleUrls: ['./venta-mayor.component.css']
})
export class VentaMayorComponent implements OnInit, OnDestroy {


  isLoading = false;
  ventaInfo: ventaModelo[] = [];
  productoInfo: ProductoModel[] = [];
  datosMuestra: mostrarDatos[] = []
  datos = true

  private subscription?: Subscription[] = [];

  constructor(
    private dataSharingService: DataSharingService,
    private ventaservice: VentaService
  ) {

  }

  ngOnInit(): void {
    this.ventaInfo = this.dataSharingService.getDatosVenta();
    this.productoInfo = this.dataSharingService.getDatosProducto();

    this.datosMuestra = [];

    for (let index = 0; index < this.ventaInfo.length; index++) {
      this.datosMuestra.push({
        codigo: this.ventaInfo[index].codigO_PRODUCTO,
        nombre: this.productoInfo[index].nombrE_PRODUCTO,
        descripcion: this.productoInfo[index].descripcioN_PRODUCTO,
        cantidad: this.ventaInfo[index].cantidad
      });
    }

    if (this.datosMuestra.length > 0) {
      this.datos = false
    }
  }

  ngOnDestroy(): void {
    this.subscription?.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  realizarVenta() {
    this.isLoading = true
    console.log(this.ventaInfo)
    this.subscription?.push(
      this.ventaservice.realizarVenta(this.ventaInfo).subscribe(
        (response) => {
          this.ventaRealizada()

        },
        (error) => {
          this.errorServidor()
        }
      )
    )
  }

  ventaRealizada() {
    this.isLoading = false;
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      text: 'Venta realizada exitosamente.',
      showConfirmButton: true,
      allowOutsideClick: false,
    }).then((e) => {
      if (e.isConfirmed) {
        window.location.reload();
      }
    }
    )
  }

  errorVenta() {
    this.isLoading = false;
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      text: 'Ocurrio un error al realizar venta.',
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2500
    })
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

export interface mostrarDatos {
  codigo: string
  nombre: string
  descripcion: string
  cantidad: number
}
