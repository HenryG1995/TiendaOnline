import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../Clientes/crear-cliente/crear-cliente.component';
import { estadosmodel } from 'src/app/modelos/estados.model';
import { ProveedoresModel } from 'src/app/modelos/proveedores.model';
import Swal from 'sweetalert2';
import { ProductoModel } from 'src/app/modelos/producto.model';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { EstadosService } from 'src/app/servicios/estados.service';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {

  imageData: string | undefined;
  // imageDataresult: string | undefined;
  estadosInfo: estadosmodel[] = [];
  proveedoresInfo: ProveedoresModel[] = [];
  matcher = new MyErrorStateMatcher();
  productoInfo = new ProductoModel();
  datosProducto: ProductoModel[] = [];

  ngOnInit(): void {

  }

  constructor(
    private _formBuilder: FormBuilder,
    private productoservice: ProductoService,
    private proveedoresservice: ProveedorService,
    private estadosservice: EstadosService,
  ) { }

  productoFormGroupConsulta = this._formBuilder.group({
    codigoProductoControl: ['', Validators.required]
  })

  productoFormGroup = this._formBuilder.group({
    nombreProductoControl: ['', Validators.required],
    descripcionProductoControl: ['', Validators.required],
    unidadesControl: [0, Validators.required],
    estadoProductoControl: ['', Validators.required],
    proveedorProductoControl: ['', Validators.required],
    imagenProductoControl: ['', Validators.required],
    activoProductoControl: ['', Validators.required],
    fechaCarga: [new Date(), Validators.required],
    fechaIngreso: [new Date(), Validators.required],
    fechaVencimiento: [new Date(), Validators.required]
  })

  buscarProducto() {
    this.datosProducto = []

    if (this.productoFormGroupConsulta.valid) {
      this.productoservice.obtenerProducto(this.productoFormGroupConsulta.get('codigoProductoControl')?.value || '').subscribe(
        (response) => {
          // ca50701a-d7cf-4def-b565-3d6c37b60440
          this.obtenerEstados();
          this.obtenerProveedores();

          if (response.length > 0) {
            this.datosProducto = response.map((item: any) => {
              Object.keys(item).forEach(key => {
                if (item[key] === null) item[key] = '';
              });
              return item;
            });

            this.imageData = response[0].imagen;

            this.productoFormGroup.patchValue({
              nombreProductoControl: response[0].nombrE_PRODUCTO,
              descripcionProductoControl: response[0].descripcioN_PRODUCTO,
              unidadesControl: response[0].unidadeS_EXISTENTES,
              estadoProductoControl: response[0].uuiD_ESTADO,
              proveedorProductoControl: response[0].codigO_PROVEEDOR,
              activoProductoControl: response[0].activo.toString(),
              fechaCarga: response[0].fechA_CARGA ? new Date(response[0].fechA_CARGA) : null,  // Utiliza nullish coalescing (??)
              fechaIngreso: response[0].fechA_INGRESO ? new Date(response[0].fechA_INGRESO) : null,
              fechaVencimiento: response[0].caducidad ? new Date(response[0].caducidad) : null
            });

            // this.productoFormGroupConsulta.reset()
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
        (error) => {
          Swal.fire({
            position: 'top-end',
            icon: 'info',
            text: 'Ocurrio un error con el servidor.',
            showConfirmButton: false,
            timer: 3000,
            allowOutsideClick: false
          });
        }
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

  onFileSelected(event: any) {
    return new Promise<string>((resolve, reject) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          const base64String = e.target.result;
          this.imageData = e.target.result;
          // this.formData.imagenBase64 = base64String;
          resolve(base64String);
        };
      } else {
        reject('No se seleccionó un archivo válido.');
      }
    });
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

  actualizarProducto() {



    if (this.productoFormGroup.valid) {
      this.productoInfo.codigO_PRODUCTO = ''
      this.productoInfo.nombrE_PRODUCTO = this.productoFormGroup.get('nombreProductoControl')?.value || ''
      this.productoInfo.descripcioN_PRODUCTO = this.productoFormGroup.get('descripcionProductoControl')?.value || ''
      this.productoInfo.unidadeS_EXISTENTES = this.productoFormGroup.get('unidadesControl')?.value || 0
      this.productoInfo.fechA_CARGA = this.productoFormGroup.get('fechaCarga')?.value ?? new Date
      this.productoInfo.fechA_INGRESO = this.productoFormGroup.get('fechaIngreso')?.value ?? new Date;
      this.productoInfo.uuiD_ESTADO = this.productoFormGroup.get('estadoProductoControl')?.value || ''
      this.productoInfo.codigO_PROVEEDOR = this.productoFormGroup.get('proveedorProductoControl')?.value || ''
      this.productoInfo.caducidad = this.productoFormGroup.get('fechaVencimiento')?.value ?? new Date;
      this.productoInfo.imagen = this.imageData || ''

      const stringValue = this.productoFormGroup.get('activoProductoControl')?.value;
      this.productoInfo.activo = parseInt(stringValue || '0', 10) || 0

      console.log('fecha carga: ', this.productoInfo.fechA_CARGA)
      console.log('fecha ingreso: ', this.productoInfo.fechA_INGRESO)
      console.log('fecha vencimiento: ', this.productoInfo.caducidad)

      this.productoservice.crearProducto(this.productoInfo).subscribe(
        (response) => {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'Cliente creado exitosamente.',
            showConfirmButton: false,
            timer: 3000,
            allowOutsideClick: false
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              this.productoFormGroup.reset();
              location.reload();
            }
          });

        },
        (error) => {

          Swal.fire({
            position: 'top-end',
            icon: 'error',
            text: 'Error al crear el cliente.',
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
}
