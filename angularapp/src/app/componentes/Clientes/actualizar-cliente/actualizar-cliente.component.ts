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

  clienteInfo = new ConsultaCliente();
  direccionInfo = new direccionClienteModel();
  codCliente = new ConsultacodCliente();

  estadosInfo: estadosmodel[] = [];
  categoriasInfo: categoriasModel[] = [];
  

  ngOnInit(): void {
    window.addEventListener('beforeunload', () => {
      this.isLoading = true;
    });

    this.obtenerCategorias();
    this.obtenerEstados();
  }

  codigoForm = this._formBuilder.group({
    codclienteControl: ['', [Validators.required, Validators.minLength(25)]]
  })

  //validación de campos requeridos como obligatorios en formulario de datos personales
  datosFormGroup = this._formBuilder.group({
    codclienteControl: ['', Validators.required],
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
      this.datosFormGroup.reset
      
      this.codCliente.codigO_CLIENTE = this.codigoForm.get('codclienteControl')?.value?.toUpperCase() || ''
      try {
        console.log('el valor del codigo es: ' + this.codCliente.codigO_CLIENTE)

        this.clienteservice.InfoCliente(this.codCliente).subscribe(
          (response: any) => {
            this.categoriasInfo = response;
            this.idFind = true;
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

  clienteNextStep() {
    const nit = this.datosFormGroup.get('nit')?.value || 0;
    const telefono = this.datosFormGroup.get('numtelefono')?.value || 0;

    // // var nombrePais = this.direccionFormGroup.get('paisControl')?.value

    var nombreEstado = this.datosFormGroup.get('estadoControl')?.value
    var nombreCategoria = this.datosFormGroup.get('categoriaControl')?.value

    this.estadosInfo.forEach(e => {
      e.codigO_ESTADO === nombreEstado ? this.nombreEstadoi = e.estado : '';
    });

    this.categoriasInfo.forEach(e => {
      e.codigO_CATEGORIA === nombreCategoria ? this.nombreCategoriai = e.nombrE_CATEGORIA : '';
    });

    // console.log('BUENOOOOOOOOOO EL CODIGO ESTADO ES: ', nombreEstado)


    if (this.datosFormGroup.valid) {
      if (nit != 0 && telefono != 0) {
        // var estado = 

        this.clienteInfo.CODIGO_CLIENTE = this.datosFormGroup.get('codclienteControl')?.value?.toUpperCase() || "";
        this.clienteInfo.PRIMER_NOMBRE = this.datosFormGroup.get('primerNombreControl')?.value?.toUpperCase() || "";
        this.clienteInfo.SEGUNDO_NOMBRE = this.datosFormGroup.get('segundoNombreControl')?.value?.toUpperCase() || "";
        this.clienteInfo.PRIMER_APELLIDO = this.datosFormGroup.get('primerApellidoControl')?.value?.toUpperCase() || "";
        this.clienteInfo.SEGUNDO_APELLIDO = this.datosFormGroup.get('segundoApellidoControl')?.value?.toUpperCase() || "";
        this.clienteInfo.NIT = this.datosFormGroup.get('nit')?.value?.toUpperCase() || '';
        this.clienteInfo.TELEFONO = this.datosFormGroup.get('numtelefono')?.value || 0;
        this.clienteInfo.CODIGO_ESTADO = this.datosFormGroup.get('estadoControl')?.value?.toUpperCase() || '';
        this.clienteInfo.CODIGO_CATEGORIA = this.datosFormGroup.get('categoriaControl')?.value?.toUpperCase() || '';

        console.log('codigo: ', this.clienteInfo.CODIGO_CLIENTE)
        console.log('estado: ', this.clienteInfo.CODIGO_ESTADO)
        console.log('categoria: ', this.clienteInfo.CODIGO_CATEGORIA)
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          text: 'NIT o teléfono inválido.',
          showConfirmButton: false,
          timer: 2500
        })
      }
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        text: 'Llenar campos obligatorios.',
        showConfirmButton: false,
        timer: 2500
      })
    }
  }

  direccionNextStep() {

    this.clienteInfo.DIRECCION_CLIENTE = this.direccionInfo['DESCRIPCION DIRECCION']
      + ' zona: ' + this.direccionInfo.ZONA
      + ' municipio: ' + this.direccionInfo.MUNICIPIO
      + ' departamento: ' + this.direccionInfo.DEPARTAMENTO
      + ' pais: ' + this.direccionInfo.PAIS + ', '
      + this.direccionInfo.NOTAS_ADICIONALES
  }

  removeData() {
    this.datosFormGroup.reset();
  }


  crearCliente() {

    if (this.datosFormGroup.valid) {


      this.clienteservice.createClient(this.clienteInfo).subscribe(
        (response: ConsultaCliente[]) => {
          if (response) {

            // La inserción en la base de datos se realizó correctamente.
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: 'Cliente creado exitosamente.',
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {

                this.removeData();
                location.reload();
              }
            });
          } else {
            // Hubo un error en la inserción en la base de datos.
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              text: 'Error al crear el cliente.',
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

}
