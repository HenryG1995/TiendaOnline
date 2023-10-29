import { Component, OnInit, Input, Output } from '@angular/core';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../Clientes/crear-cliente/crear-cliente.component';
import { estadosmodel } from 'src/app/modelos/estados.model';
import { EstadosService } from 'src/app/servicios/estados.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { ProveedoresModel } from 'src/app/modelos/proveedores.model';
import { ProductoModel } from 'src/app/modelos/producto.model';

import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  fechaVencimiento: Date | null = null;
  fechaCarga: Date | null = null;
  fechaIngreso: Date | null = null;
  disableFechaCarga = true;
  imageData: string | undefined;

  estadosInfo: estadosmodel[] = [];
  proveedoresInfo: ProveedoresModel[] = [];

  productoInfo = new ProductoModel();

  matcher = new MyErrorStateMatcher();

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private datePipe: DatePipe,
    private http: HttpClient,
    private _formBuilder: FormBuilder,
    private estadosservice: EstadosService,
    private proveedoresservice: ProveedorService,
    private productoservice: ProductoService,
  ) {
    // this.dateAdapter.setLocale('es')
  }

  obtenerEstados() {
    try {
      this.estadosservice.obtenerEstadosAPI().subscribe(
        (response: any) => {
          this.estadosInfo = response;
        },
        (error) => {
          console.error('Error en la solicitud de obtener estado ', error);
        }
      )
    } catch (error) {
      console.error('Este es el error al obtener estados: ', error);
    }
  }

  obtenerProveedores() {
    this.proveedoresservice.obtenerListadoProveedores().subscribe(
      (response: ProveedoresModel[]) => {
        this.proveedoresInfo = response;
      },
      (error) => {
        console.log('Error al obtener proveedores: ', error)
      }
    )
  }

  ngOnInit(): void {
    this.obtenerEstados();
    this.obtenerProveedores();
  }

  onFechaChange(event: any) {
    const fecha = event.value
    if (fecha) {
      const fechaFormateada = this.datePipe.transform(fecha, 'yyyy-MM-ddTHH:mm:ss.sssZ')
    }
  }

  productoFormGroup = this._formBuilder.group({
    nombreProductoControl: ['', Validators.required],
    descripcionProductoControl: ['', Validators.required],
    unidadesControl: [0, Validators.required],
    estadoProductoControl: ['', Validators.required],
    proveedorProductoControl: ['', Validators.required],
    imagenProductoControl: ['', Validators.required],
    activoProductoControl: [0, Validators.required],
    fechaCarga: [null, Validators.required],
    fechaIngreso: [null, Validators.required],
    fechaVencimiento: [null, Validators.required]
  })


  onFileSelected(event: any) {
    return new Promise<string>((resolve, reject) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          const base64String = e.target.result;
          this.imageData = e.target.result;
          this.formData.imagenBase64 = base64String;
          resolve(base64String);
        };
      } else {
        reject('No se seleccionó un archivo válido.');
      }
    });
  }

  // leerImagen() {
  //   this.onFileSelected(event)
  //     .then((base64String) => {
  //       if (base64String) {
  //         // this.productoInfo.imagen = base64String;
  //       } else {
  //         console.error('No se seleccionó un archivo válido.');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }


  crearProducto() {

    if (this.productoFormGroup.valid) {
      this.productoInfo.codigO_PRODUCTO = ''
      this.productoInfo.nombrE_PRODUCTO = this.productoFormGroup.get('nombreProductoControl')?.value || ''
      this.productoInfo.descripcioN_PRODUCTO = this.productoFormGroup.get('descripcionProductoControl')?.value || ''
      this.productoInfo.unidadeS_EXISTENTES = this.productoFormGroup.get('unidadesControl')?.value || 0
      this.productoInfo.fechA_CARGA = this.productoFormGroup.get('fechaCarga')?.value ?? new Date
      this.productoInfo.fechA_INGRESO = this.productoFormGroup.get('fechaIngreso')?.value ?? new Date;
      this.productoInfo.uuiD_ESTADO = this.productoFormGroup.get('estadoProductoControl')?.value || ''
      this.productoInfo.activo = this.productoFormGroup.get('activoProductoControl')?.value || 0
      this.productoInfo.codigO_PROVEEDOR = this.productoFormGroup.get('proveedorProductoControl')?.value || ''
      this.productoInfo.caducidad = this.productoFormGroup.get('fechaVencimiento')?.value ?? new Date;
      this.productoInfo.imagen = this.imageData || ''

      console.log('fecha carga: ', this.productoInfo.fechA_CARGA)
      console.log('fecha ingreso: ', this.productoInfo.fechA_INGRESO)
      console.log('fecha vencimiento: ', this.productoInfo.caducidad)

      this.productoservice.crearProducto(this.productoInfo).subscribe(
        (response) => {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'Producto creado exitosamente,',
            // timer: 3000,
            allowOutsideClick: false
          }).then((result) => {
            // if (result.dismiss === Swal.DismissReason.timer) {
              this.productoFormGroup.reset();
              location.reload();
            // }
          });

        },
        (error) => {

          Swal.fire({
            position: 'top-end',
            icon: 'error',
            text: 'Error al crear el producto.',
            showConfirmButton: false,
            timer: 3000,
            allowOutsideClick: false
          });

        }

      );
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        text: 'Completar valores obligatorios.',
        showConfirmButton: false,
        timer: 3000,
        allowOutsideClick: false
      });
    }

  }



































  // this.productoInfo.codigO_PRODUCTO = '';
  // this.productoInfo.nombrE_PRODUCTO = ;
  // this.productoInfo.descripcioN_PRODUCTO = ;
  // this.productoInfo.unidadeS_EXISTENTES = ;
  // this.productoInfo.uuiD_ESTADO = ;
  // this.productoInfo.codigO_PROVEEDOR = ;
  // this.productoInfo.activo = ;
  // this.productoInfo.fechA_CARGA = ;
  // this.productoInfo.fechA_INGRESO = ;
  // this.productoInfo.caducidad = ;
  // this.productoInfo.imagen = this.imageData || '';


  formData = {
    nombre: '',
    descripcion: '',
    imagenBase64: ''
  };
  // submitForm() {
  //   // Convierte this.formData a un objeto que coincida con la estructura del JSON que deseas enviar.
  //   console.log('producto: ', this.formData.nombre)
  //   console.log('descripcion: ', this.formData.descripcion)
  //   console.log('imagen: ', this.formData.imagenBase64)

  //   


  // }

}
