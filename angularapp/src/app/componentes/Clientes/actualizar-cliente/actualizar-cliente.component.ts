import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { estadosmodel } from 'src/app/modelos/estados.model';
import { EstadosService } from 'src/app/servicios/estados.service';
import { categoriasModel } from 'src/app/modelos/categorias.model';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { direccionClienteModel } from 'src/app/modelos/direccionCliente.model';
import { ConsultaCliente, ConsultacodCliente } from 'src/app/modelos/cliente.model';


import Swal from 'sweetalert2';

/** Error cuando un control ha sido modificado, en este caso para validar la selección de tipo cliente */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit {

  idFind = false;
  isLoading = false;
  isLinear = true;
  disableValidations = true;
  codigoClientei = "";
  numniti = ""
  telefonoi = 0

  clienteInfo = new ConsultaCliente();
  direccionInfo = new direccionClienteModel();
  codCliente = new ConsultacodCliente();

  estadosInfo: estadosmodel[] = [];
  categoriasInfo: categoriasModel[] = [];


  ngOnInit(): void {
    window.addEventListener('beforeunload', () => {
      this.isLoading = true;
    });
  }

  codigoForm = this._formBuilder.group({
    codclienteControl: ['', [Validators.required, Validators.minLength(25)]]
  })

  //validación de campos requeridos como obligatorios en formulario de datos personales
  datosFormGroup = this._formBuilder.group({
    codigoClienteControl: [''],
    primerNombreControl: ['', Validators.required],
    segundoNombreControl: [''],
    primerApellidoControl: ['', Validators.required],
    segundoApellidoControl: [''],
    nitControl: ['', Validators.required],
    numtelefonoControl: [0, Validators.required],
    categoriaControl: ['', Validators.required],
    estadoControl: ['', Validators.required],
    direccionControl: ['', Validators.required]
  });

  matcher = new MyErrorStateMatcher();

  constructor(
    private _formBuilder: FormBuilder,
    private clienteservice: ClientesService,
    private estadosservice: EstadosService,
    private categoriasservice: CategoriasService,
  ) { }

  obtenerCategorias() {
    try {
      this.categoriasservice.obtenerCategoriasAPI().subscribe(
        (response: any) => {
          this.categoriasInfo = response;
        },
        (error) => {
          console.error('Error en la solicitud de obtener estados ', error);
        }
      )
    } catch (error) {
      console.error('Este es el error al obtener las categorias ', error);
    }
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

  buscarCliente() {
    if (this.codigoForm.valid) {
      this.idFind = false
      this.datosFormGroup.reset()

      this.codCliente.codigO_CLIENTE = this.codigoForm.get('codclienteControl')?.value?.toUpperCase() || ''

      try {

        this.clienteservice.InfoCliente(this.codCliente).subscribe(
          (response: any) => {

            if (response.length > 0) {

              response.map((item: any) => {
                Object.keys(item).forEach(key => {
                  if (item[key] === null) item[key] = '';
                });
                return item;
              });

              this.codigoClientei = this.codCliente.codigO_CLIENTE;

              this.datosFormGroup.patchValue({
                codigoClienteControl: response[0].codigO_CLIENTE,
                primerNombreControl: response[0].primeR_NOMBRE,
                segundoNombreControl: response[0].segundO_NOMBRE,
                primerApellidoControl: response[0].primeR_APELLIDO,
                segundoApellidoControl: response[0].segundO_APELLIDO,
                nitControl: response[0].nit,
                numtelefonoControl: response[0].telefono,
                direccionControl: response[0].direccioN_CLIENTE,
                estadoControl: response[0].codigO_ESTADO,
                categoriaControl: response[0].codigO_CATEGORIA
              });

              this.idFind = true;
              this.codigoForm.reset();
              this.obtenerCategorias();
              this.obtenerEstados();

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
  }

  Actualizar() {
    if (this.datosFormGroup.valid) {
      this.numniti = this.datosFormGroup.get('nitControl')?.value || '';
      this.telefonoi = this.datosFormGroup.get('numtelefonoControl')?.value || 0;

      if (this.numniti !== "0" && this.telefonoi !== 0) {
        this.clienteInfo.CODIGO_CLIENTE = this.codigoClientei;
        this.clienteInfo.PRIMER_NOMBRE = this.datosFormGroup.get('primerNombreControl')?.value?.toUpperCase() || "";
        this.clienteInfo.SEGUNDO_NOMBRE = this.datosFormGroup.get('segundoNombreControl')?.value?.toUpperCase() || "";
        this.clienteInfo.PRIMER_APELLIDO = this.datosFormGroup.get('primerApellidoControl')?.value?.toUpperCase() || "";
        this.clienteInfo.SEGUNDO_APELLIDO = this.datosFormGroup.get('segundoApellidoControl')?.value?.toUpperCase() || "";
        this.clienteInfo.NIT = this.datosFormGroup.get('nitControl')?.value || "";
        this.clienteInfo.DIRECCION_CLIENTE = this.datosFormGroup.get('direccionControl')?.value?.toUpperCase() || '';
        this.clienteInfo.CODIGO_ESTADO = this.datosFormGroup.get('estadoControl')?.value || '';
        this.clienteInfo.CODIGO_CATEGORIA = this.datosFormGroup.get('categoriaControl')?.value || '';
        this.clienteInfo.TELEFONO = this.datosFormGroup.get('numtelefonoControl')?.value || 0;

        this.clienteservice.actualizarCliente(this.clienteInfo).subscribe(
          (response: any) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: 'El cliente ha sido actualizado exitosamente.',
              showConfirmButton: false,
              timer: 2500
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                location.reload();
              }
            });
          },
          (error) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              text: 'Error en la comunicación con el servidor.',
              showConfirmButton: false,
              timer: 2500
            });
          }
        );
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          text: 'Número de NIT o teléfono inválido.',
          showConfirmButton: false,
          timer: 2500
        })
      }
    }else {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        text: 'Alguno de los campos ingresados no es válido.',
        showConfirmButton: false,
        timer: 2500
      })
    }
  }
}