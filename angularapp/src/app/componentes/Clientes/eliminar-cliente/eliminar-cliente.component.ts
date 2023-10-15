import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { ConsultaCliente, ConsultacodCliente, DatosCliente } from 'src/app/modelos/cliente.model';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { direccionClienteModel } from 'src/app/modelos/direccionCliente.model';
import { estadosmodel } from 'src/app/modelos/estados.model';
import { categoriasModel } from 'src/app/modelos/categorias.model';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css']
})
export class EliminarClienteComponent implements OnInit {

  idFind = false;
  isLoading = false;
  codigoClientei = "";

  clienteInfo = new DatosCliente();
  direccionInfo = new direccionClienteModel();
  consulta = new ConsultaCliente();
  eliminaCliente = new ConsultacodCliente();

  estadosInfo: estadosmodel[] = [];
  categoriasInfo: categoriasModel[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private clienteservice: ClientesService,
  ) { }

  codigoForm = this._formBuilder.group({
    codclienteControl: ['', [Validators.required, Validators.minLength(25)]]
  })


  datosFormGroup = this._formBuilder.group({
    nombreControl: [{ value: '', disabled: true }],
    direccionControl: [{ value: '', disabled: true }],
    nitControl: [{ value: '', disabled: true }],
    telefonoControl: [{ value: '', disabled: true }],
    estadoControl: [{ value: '', disabled: true }],
    categoriaControl: [{ value: '', disabled: true }]
  });

  ngOnInit(): void {
    window.addEventListener('beforeunload', () => {
      this.isLoading = true;
    });
  }


  buscarCliente() {

    this.eliminaCliente.codigO_CLIENTE = this.codigoForm.get('codclienteControl')?.value?.toUpperCase() ?? ''

    try {

      this.clienteservice.InfoCliente(this.eliminaCliente).subscribe(
        (response: any) => {

          if (response.length > 0) {

            response.map((item: any) => {
              Object.keys(item).forEach(key => {
                if (item[key] === null) item[key] = '';
              });
              return item;
            });

            console.log('nombre: ', response[0].primeR_NOMBRE)
            console.log('estado: ', response[0].estado)
            console.log('categoria: ', response[0].categoria)

            this.datosFormGroup.patchValue({
              nombreControl:
                response[0].primeR_NOMBRE + " " +
                response[0].segundO_NOMBRE + " " +
                response[0].primeR_APELLIDO + " " +
                response[0].segundO_APELLIDO,
              nitControl: response[0].nit,
              telefonoControl: response[0].telefono,
              direccionControl: response[0].direccioN_CLIENTE,
              estadoControl: response[0].estado,
              categoriaControl: response[0].categoria
            });

            this.idFind = true;
            this.codigoForm.reset();

          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'info',
              text: 'No existen datos de cliente.',
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false
            });
          }
        },
        (error) => {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            text: 'Ocurrio un error al obtener los datos.',
            showConfirmButton: false,
            timer: 2500
          });
        }
      )
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        text: 'Ocurrio un error con el servidor',
        showConfirmButton: false,
        timer: 2500
      });
    }
  }


  eliminarCliente() {
    console.log('Elimina al cliente', this.eliminaCliente.codigO_CLIENTE )

    
    this.clienteservice.eliminarCliente(this.eliminaCliente).subscribe(
      (response: any) => {
        if (response) {
          // La inserción en la base de datos se realizó correctamente.
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'Cliente dado de baja exitosamente.',
            showConfirmButton: false,
            timer: 3000,
            allowOutsideClick: false
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              this.limpiaPantalla();
              location.reload();
            }
          });
        } else {
          // Hubo un error en la inserción en la base de datos.
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            text: 'Error al cambiar estado del cliente.',
            showConfirmButton: false,
            timer: 3000,
            allowOutsideClick: false
          });
        }
      },
      (error) => {
        // Error de comunicación con el servidor.
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          text: 'Error en la comunicación con el servidor.',
          showConfirmButton: false,
          timer: 2500
        });
      }
    );
  }

  limpiaPantalla() {
    this.idFind = false

    this.codigoForm.reset();
    this.datosFormGroup.reset();

  }

}
