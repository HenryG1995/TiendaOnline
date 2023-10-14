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
  nombreEstadoi = "";
  nombreCategoriai = "";
  codigoCliente = "";

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
    primerNombreControl: ['', Validators.required],
    segundoNombreControl: [''],
    primerApellidoControl: ['', Validators.required],
    segundoApellidoControl: [''],
    nit: ['', Validators.required],
    numtelefono: [0, Validators.required],
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
        console.log('el valor del codigo es: ' + this.codCliente.codigO_CLIENTE)

        this.clienteservice.InfoCliente(this.codCliente).subscribe(
          (response: any) => {

            if (response.length > 0) {
              this.clienteInfo = response.map((item: any) => {
                Object.keys(item).forEach(key => {
                  if (item[key] === null) item[key] = '';
                });
                return item;
              });

              this.codigoCliente = this.codCliente.codigO_CLIENTE;

              this.datosFormGroup.patchValue({
                primerNombreControl: response[0].primeR_NOMBRE,
                segundoNombreControl: response[0].segundO_NOMBRE,
                primerApellidoControl: response[0].primeR_APELLIDO,
                segundoApellidoControl: response[0].segundO_APELLIDO,
                nit: response[0].nit,
                numtelefono: response[0].telefono,
                direccionControl: response[0].direccioN_CLIENTE,
                estadoControl: response[0].codigO_ESTADO,
                categoriaControl: response[0].codigO_CATEGORIA
              });


              // this.categoriasInfo = response;
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
            })
            console.error('Error en la solicitud de obtener estados ', error);
          }
        )
      } catch (error) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          text: 'Ocurrio un error con el servidor',
          showConfirmButton: false,
          timer: 2500
        })
        console.error('Este es el error al obtener las categorias ', error);
      }
    }
  }

  Actualizar() {
    const nit = this.datosFormGroup.get('nit')?.value || 0;
    const telefono = this.datosFormGroup.get('numtelefono')?.value || 0;

    // var nombreEstado = this.datosFormGroup.get('estadoControl')?.value
    // var nombreCategoria = this.datosFormGroup.get('categoriaControl')?.value

    // this.estadosInfo.forEach(e => {
    //   e.codigO_ESTADO === nombreEstado ? this.nombreEstadoi = e.estado : '';
    // });

    // this.categoriasInfo.forEach(e => {
    //   e.codigO_CATEGORIA === nombreCategoria ? this.nombreCategoriai = e.nombrE_CATEGORIA : '';
    // });

    // console.log('estadocontrol: ' + this.datosFormGroup.get('estadoControl')?.value?.toUpperCase())
    // console.log('categoriacontrol: ' + this.datosFormGroup.get('categoriaControl')?.value)

    if (this.datosFormGroup.valid) {
      if (nit != 0 && telefono != 0) {
        this.clienteInfo.CODIGO_CLIENTE = this.codigoCliente;
        this.clienteInfo.PRIMER_NOMBRE = this.datosFormGroup.get('primerNombreControl')?.value?.toUpperCase() || "";
        this.clienteInfo.SEGUNDO_NOMBRE = this.datosFormGroup.get('segundoNombreControl')?.value?.toUpperCase() || "";
        this.clienteInfo.PRIMER_APELLIDO = this.datosFormGroup.get('primerApellidoControl')?.value?.toUpperCase() || "";
        this.clienteInfo.SEGUNDO_APELLIDO = this.datosFormGroup.get('segundoApellidoControl')?.value?.toUpperCase() || "";
        this.clienteInfo.NIT = nit
        this.clienteInfo.DIRECCION_CLIENTE = this.datosFormGroup.get('direccionControl')?.value?.toUpperCase() || '';
        this.clienteInfo.CODIGO_ESTADO = this.datosFormGroup.get('estadoControl')?.value || '';
        this.clienteInfo.CODIGO_CATEGORIA = this.datosFormGroup.get('categoriaControl')?.value || '';
        this.clienteInfo.TELEFONO = telefono

    //     this.clienteInfo.CODIGO_CLIENTE = "74FDF8F558624C3A8575E9BA23B0C332"
    // this.clienteInfo.PRIMER_NOMBRE = "HECTOR"
    // this.clienteInfo.SEGUNDO_NOMBRE = "JAVIER"
    // this.clienteInfo.PRIMER_APELLIDO = "GUTIERREZ"
    // this.clienteInfo.SEGUNDO_APELLIDO = "HERNANDEZ"
    // this.clienteInfo.NIT = "cf"
    // this.clienteInfo.DIRECCION_CLIENTE = "9NA AVENIDA zona: 1 municipio: GUATEMALA departamento: GUATEMALA pais: GUATEMALA"
    // this.clienteInfo.CODIGO_ESTADO = "D6A9E45954714523BD4CEF16B1BB16C6"
    // this.clienteInfo.CODIGO_CATEGORIA = "91D3EFF699F040F481ED77F5981BC319"
    // this.clienteInfo.TELEFONO = 22222222

        this.clienteservice.actualizarCliente(this.clienteInfo).subscribe(
          (response: any) => {
            console.log('a ver: [' + response + ']')
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: 'todo cool',
              showConfirmButton: false,
              timer: 2500
            });
          },
          (error) => {
            console.log('a ver el error pue: ' + error)
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
      else {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          text: 'NIT o teléfono inválido.',
          showConfirmButton: false,
          timer: 2500
        })
      }
    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: 'Alguno de los campos ingresados no es válido.',
        showConfirmButton: false,
        timer: 2500
      })
    }
  }

  removeData() {
    this.datosFormGroup.reset();
  }


  actualizarCliente(dato: ConsultaCliente) {

    if (this.datosFormGroup.valid) {
      this.clienteservice.actualizarCliente(dato).subscribe(
        (response: any) => {
          console.log('a ver: [' + response + ']')
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'todo cool',
            showConfirmButton: false,
            timer: 2500
          });
        },
        (error) => {
          console.log('a ver el error pue: ' + error)
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
        icon: 'error',
        text: 'Alguno de los campos ingresados no es válido.',
        showConfirmButton: false,
        timer: 2500
      })
    }
  }

  pruebaactualizar() {
    this.clienteInfo.CODIGO_CLIENTE = "74FDF8F558624C3A8575E9BA23B0C332"
    this.clienteInfo.PRIMER_NOMBRE = "HECTOR"
    this.clienteInfo.SEGUNDO_NOMBRE = "JAVIER"
    this.clienteInfo.PRIMER_APELLIDO = "GUTIERREZ"
    this.clienteInfo.SEGUNDO_APELLIDO = "HERNANDEZ"
    this.clienteInfo.NIT = "cf"
    this.clienteInfo.DIRECCION_CLIENTE = "9NA AVENIDA zona: 1 municipio: GUATEMALA departamento: GUATEMALA pais: GUATEMALA"
    this.clienteInfo.CODIGO_ESTADO = "D6A9E45954714523BD4CEF16B1BB16C6"
    this.clienteInfo.CODIGO_CATEGORIA = "91D3EFF699F040F481ED77F5981BC319"
    this.clienteInfo.TELEFONO = 22222222

    this.clienteservice.actualizarCliente(this.clienteInfo).subscribe(
      (response: any) => {
        console.log('a ver: [' + response + ']')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'todo cool',
          showConfirmButton: false,
          timer: 2500
        });
      },
      (error) => {
        console.log('a ver el error pue: ' + error)
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
}
