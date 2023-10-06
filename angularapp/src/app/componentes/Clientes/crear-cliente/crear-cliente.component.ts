import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';
import { ErrorStateMatcher } from '@angular/material/core';
import { ClientesService, datosCliente } from 'src/app/servicios/clientes.service';
import { estadosmodel } from 'src/app/modelos/estados.model';
import { EstadosService } from 'src/app/servicios/estados.service';
import { categoriasModel } from 'src/app/modelos/categorias.model';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { PaisService } from 'src/app/servicios/pais.service';
import { DepartamentoService } from 'src/app/servicios/departamento.service';
import { MunicipioService } from 'src/app/servicios/municipio.service';
import { ZonaService } from 'src/app/servicios/zona.service';
import { paisModel } from 'src/app/modelos/pais.model';
import { departamentoModel } from 'src/app/modelos/departamento.model';
import { municipioModel } from 'src/app/modelos/municipio.model';
import { zonaModel } from 'src/app/modelos/zona.model';
import { direccionClienteModel } from 'src/app/modelos/direccionCliente.model';
import { ConsultaCliente } from 'src/app/modelos/cliente.model';
import { MatStepper } from '@angular/material/stepper';

import Swal from 'sweetalert2';

/** Error cuando un control ha sido modificado, en este caso para validar la selección de tipo cliente */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  //validación de horientación y tamaño de pantalla
  stepperOrientation!: Observable<StepperOrientation>;

  isLoading = false;
  isLinear = true;
  isTableEmpty = true;
  disableValidations = true;
  showTable = false;
  nombreEstadoi = "";
  nombreCategoriai = "";

  clienteInfo = new ConsultaCliente();
  direccionInfo = new direccionClienteModel();


  estadosInfo: estadosmodel[] = [];
  categoriasInfo: categoriasModel[] = [];
  paisInfo: paisModel[] = [];
  departamentoInfo: departamentoModel[] = [];
  municipioInfo: municipioModel[] = [];
  zonasInfo: zonaModel[] = [];
  ELEMENT_DATA: direccionClienteModel[] = [];

  //agregar datos a la tabla de dirección
  displayedColumns: string[] = ['Descripción', 'Pais', 'Departamento', 'Municipio', 'Zona'];
  dataSource = this.ELEMENT_DATA;

  @ViewChild(MatTable) table!: MatTable<direccionClienteModel[]>;
  @ViewChild('stepper') stepper!: MatStepper;

  ngOnInit(): void {
    window.addEventListener('beforeunload', () => {
      this.isLoading = true;
    });

    this.obtenerCategorias();
    this.obtenerEstados();
    this.obtenerPais();
    this.obtenerDepartamento();
    this.obtenerMunicipio();
    this.obtenerZona();
  }

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
    estadoControl: ['', Validators.required]
  });

  //------------validación de campos requeridos como obligatorios en formulario de direcciones------------

  direccionFormGroup = this._formBuilder.group({
    direccionControl: ['', this.disableValidations ? null : Validators.required],
    zonaControl: ['', this.disableValidations ? null : Validators.required],
    departamentoControl: ['', this.disableValidations ? null : Validators.required],
    municipioControl: ['', this.disableValidations ? null : Validators.required],
    paisControl: ['', this.disableValidations ? null : Validators.required],
    notaAdicionalControl: [''],
  });

  //-----deshabilita los campos
  validacionFormGroup = this._formBuilder.group({
    //---------------campos de verificación de datos-----------------
    codigoClienteVerificacionControl: [{ value: '', disabled: true }],
    nombreCompletoVerificacionControl: [{ value: '', disabled: true }],
    telefonoVerificacionControl: [{ value: '', disabled: true }],
    nitVerificacionControl: [{ value: '', disabled: true }],
    estadoVerificacionControl: [{ value: '', disabled: true }],
    categoriaVerificacionControl: [{ value: '', disabled: true }],
  })

  matcher = new MyErrorStateMatcher();

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private clienteservice: ClientesService,
    private estadosservice: EstadosService,
    private categoriasservice: CategoriasService,
    private paisservice: PaisService,
    private departamentoservice: DepartamentoService,
    private municipioservice: MunicipioService,
    private zonasservice: ZonaService) {

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

  }

  obtenerZona() {
    this.zonasservice.obtenerZonasAPI().subscribe(
      (response: any) => {
        this.zonasInfo = response;
      },
      (error) => {
        console.error('Error en la solicitud de obtener zonas: ', error);
      }
    )
  }

  obtenerMunicipio() {
    this.municipioservice.obtenerMunicipioAPI().subscribe(
      (response: any) => {
        this.municipioInfo = response;
      },
      (error) => {
        console.error('Error en la solicitud de obtener municipios ', error);
      }
    )
  }

  obtenerDepartamento() {
    this.departamentoservice.obtenerDepartamentoAPI().subscribe(
      (response: any) => {
        this.departamentoInfo = response;
      },
      (error) => {
        console.error('Error en la solicitud de obtener departamento ', error);
      }
    )
  }

  obtenerPais() {
    this.paisservice.obtenerListadoPaisAPI().subscribe(
      (response: any) => {
        this.paisInfo = response;
      },
      (error) => {
        console.error('Error en la solicitud de obtener paises ', error);
      }
    )
  }

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

        this.clienteInfo.CODIGO_CLIENTE = this.datosFormGroup.get('codclienteControl')?.value || "";
        this.clienteInfo.PRIMER_NOMBRE = this.datosFormGroup.get('primerNombreControl')?.value || "";
        this.clienteInfo.SEGUNDO_NOMBRE = this.datosFormGroup.get('segundoNombreControl')?.value || "";
        this.clienteInfo.PRIMER_APELLIDO = this.datosFormGroup.get('primerApellidoControl')?.value || "";
        this.clienteInfo.SEGUNDO_APELLIDO = this.datosFormGroup.get('segundoApellidoControl')?.value || "";
        this.clienteInfo.NIT = this.datosFormGroup.get('nit')?.value || '';
        this.clienteInfo.TELEFONO = this.datosFormGroup.get('numtelefono')?.value || 0;
        this.clienteInfo.CODIGO_ESTADO = this.datosFormGroup.get('estadoControl')?.value || '';
        this.clienteInfo.CODIGO_CATEGORIA = this.datosFormGroup.get('categoriaControl')?.value || '';

        this.stepper.next();
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

  agregarDatosTabla() {
    console.log('peso de la tabla antes: ', this.dataSource.length)
    if (this.direccionFormGroup.valid) {

      this.showTable = true;

      var nombrePais = this.direccionFormGroup.get('paisControl')?.value
      var nombreDepartamento = this.direccionFormGroup.get('departamentoControl')?.value
      var nombreMunicipio = this.direccionFormGroup.get('municipioControl')?.value
      var nombreZona = this.direccionFormGroup.get('zonaControl')?.value

      this.paisInfo.forEach(e => {
        e.codigO_PAIS === nombrePais ? nombrePais = e.pais : '';
      })

      this.departamentoInfo.forEach(e => {
        e.codigO_DEPARTAMENTO === nombreDepartamento ? nombreDepartamento = e.departamento : ''
      })

      this.municipioInfo.forEach(e => {
        e.codigO_MUNICIPIO === nombreMunicipio ? nombreMunicipio = e.municipio : ''
      })

      this.zonasInfo.forEach(e => {
        e.codigO_ZONA === nombreZona ? nombreZona = e.zona.toString() : ''
      })

      this.direccionInfo.CODIGO_CLIENTE = this.datosFormGroup.get('codclienteControl')?.value || "";
      this.direccionInfo['DESCRIPCION DIRECCION'] = this.direccionFormGroup.get('direccionControl')?.value || "";
      this.direccionInfo.PAIS = nombrePais || ''
      this.direccionInfo.DEPARTAMENTO = nombreDepartamento || ''
      this.direccionInfo.MUNICIPIO = nombreMunicipio || ''
      this.direccionInfo.ZONA = nombreZona || ''
      this.direccionInfo.NOTAS_ADICIONALES = this.direccionFormGroup.get('notaAdicionalControl')?.value || "";

      this.dataSource.push(this.direccionInfo);
      this.table.renderRows();
      this.direccionFormGroup.reset();


    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        text: 'Llenar campos obligatorios.',
        showConfirmButton: false,
        timer: 2500
      })
    }

    this.isTableEmpty = this.dataSource.length === 0;
    this.disableValidations = this.dataSource.length > 0;
  }

  direccionNextStep() {
    this.stepper.next();

    this.clienteInfo.DIRECCION_CLIENTE = this.direccionInfo['DESCRIPCION DIRECCION']
      + ' zona: ' + this.direccionInfo.ZONA
      + ' municipio: ' + this.direccionInfo.MUNICIPIO
      + ' departamento: ' + this.direccionInfo.DEPARTAMENTO
      + ' pais: ' + this.direccionInfo.PAIS + ', '
      + this.direccionInfo.NOTAS_ADICIONALES
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
    this.direccionFormGroup.reset();
    this.datosFormGroup.reset();

    this.isTableEmpty = this.dataSource.length === 0;
  }


  crearCliente() {

    if (this.datosFormGroup.valid && !this.isTableEmpty) {


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
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                
                this.removeData();
                location.reload();
              }
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