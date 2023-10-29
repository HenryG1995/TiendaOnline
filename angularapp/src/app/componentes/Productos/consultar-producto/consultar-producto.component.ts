import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductoModel } from 'src/app/modelos/producto.model';
import { DateAdapter } from '@angular/material/core';
import { Moment } from 'moment';
import Swal from 'sweetalert2'
import * as _moment from 'moment';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ventaModelo } from 'src/app/modelos/venta.model';
import { DataSharingService } from 'src/app/servicios/data-sharing.service';

@Component({
  selector: 'app-consultar-producto',
  templateUrl: './consultar-producto.component.html',
  styleUrls: ['./consultar-producto.component.css']
})
export class ConsultarProductoComponent implements OnInit, AfterViewInit {

  productos: ProductoModel[] = [];
  fechaVencimiento: Date | null = null;
  datosVenta: ventaModelo[] = [];
  productoEnvio: ProductoModel[] = []


  productoFormGroupConsulta = this._formBuilder.group({
    codigoProductoControl: [''],
    descripcionProductoControl: [''],
    fechaVencimientoControl: [null],
  })

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private _formBuilder: FormBuilder,
    private productosservice: ProductoService,
    private dataSharingService: DataSharingService
  ) {
    this.dateAdapter.setLocale('es')
  }

  ngAfterViewInit(): void {
    this.obtenerListadoProductos();
  }

  ngOnInit(): void {

  }

  obtenerListadoProductos() {
    this.productosservice.obtenerListadoProductos().subscribe(
      (response: ProductoModel[]) => {

        this.productos = response;
      },
      (error) => {
        console.log('Ocurrio un error al obtener los productos.')
      }
    )
  }

  alertaCompra(item: ProductoModel) {
    Swal.fire({
      imageUrl: item.imagen,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: item.descripcioN_PRODUCTO,
      titleText: item.nombrE_PRODUCTO + " \n" + "Precio: Q." + item.precio,
      text: item.codigO_PRODUCTO,
      input: 'number',
      inputAttributes: {
        min: '1',
        max: String(item.unidadeS_EXISTENTES)
      },
      showCancelButton: true,
      confirmButtonText: 'Agregar al carrito',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const quantity = parseInt(result.value, 10);
        if (quantity > 0 && quantity <= item.unidadeS_EXISTENTES) {
          console.log('Cantidad seleccionada:', quantity);

          const productoEnCarrito: ventaModelo = {
            codigO_CLIENTE: '570E86CD8F284555B64BED139BC75AA6',
            fechA_ENTREGA: new Date,
            estado: '',
            aplicA_NOTA: 0,
            codigO_NOTA: '',
            codigO_PRODUCTO: item.codigO_PRODUCTO,
            cantidad: quantity
          };

          const producto: ProductoModel = {
            codigO_PRODUCTO: '',
            nombrE_PRODUCTO: item.nombrE_PRODUCTO,
            descripcioN_PRODUCTO: item.descripcioN_PRODUCTO,
            unidadeS_EXISTENTES: 0,
            fechA_CARGA: new Date,
            fechA_INGRESO: new Date,
            uuiD_ESTADO: '',
            activo: 0,
            imagen: '',
            codigO_PROVEEDOR: '',
            caducidad: new Date,
            precio: 0,
            descuento: 0,
            activA_DESCUENTO: 0

          }

          this.datosVenta.push(productoEnCarrito);
          this.productoEnvio.push(producto)

          this.dataSharingService.setDatosVenta(this.datosVenta);
          this.dataSharingService.setDatosProdcuto(this.productoEnvio)

          Swal.fire('Agregado al carrito', 'El producto se ha añadido al carrito.', 'success');

        } else {
          Swal.fire('Cantidad no válida', 'Por favor, ingrese una cantidad válida.', 'error');
        }
      }
    });

  }

  buscarProducto() {
    this.productos = []

    const id = this.productoFormGroupConsulta.get('codigoProductoControl')?.value ?? ''
    const desc = this.productoFormGroupConsulta.get('descripcionProductoControl')?.value ?? ''
    const vencimiento = this.productoFormGroupConsulta.get('fechaVencimientoControl')?.value ?? undefined

    if (id !== '' || desc !== '' || vencimiento !== undefined) {



      this.productosservice.obtenerProducto(id, desc, vencimiento).subscribe(
        (response) => {
          // ca50701a-d7cf-4def-b565-3d6c37b60440
          if (response.length > 0) {
            this.productos = response.map((item: any) => {
              Object.keys(item).forEach(key => {
                if (item[key] === null) item[key] = '';
              });
              return item;
            });


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
      )
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        text: 'Debe de ingresar datos del producto a buscar.',
        showConfirmButton: false,
        timer: 2500
      });
      this.obtenerListadoProductos();
    }
  }

  onFechaVencimientoChange(event: any) {
    const m: Moment = event.value;
    if (m) {
      console.log('fecha seleccionada: ', m.toDate());
    }
  }

}
