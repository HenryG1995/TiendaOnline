import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
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
/** Error cuando un control ha sido modificado, en este caso para validar la selección de tipo cliente */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface interfaceDireccion {
  numeral: string;
  type: string;
  zona: string;
  departamento: string;
  municipio: string;
}

const ELEMENT_DATA: interfaceDireccion[] = [
  // {numeral: '1ta avenida 203', type: 0, zona: 1, departamento: 'Guatemala', municipio: 'Guatemala'},
  // {numeral: '2ta avenida 203', type: 0, zona: 1, departamento: 'Guatemala', municipio: 'Guatemala'},
  // {numeral: '3ta avenida 203', type: 0, zona: 1, departamento: 'Guatemala', municipio: 'Guatemala'},
  // {numeral: '4ta avenida 203', type: 0, zona: 1, departamento: 'Guatemala', municipio: 'Guatemala'},
  // {numeral: '5ta avenida 203', type: 0, zona: 1, departamento: 'Guatemala', municipio: 'Guatemala'},
  // {numeral: '6ta avenida 203', type: 0, zona: 1, departamento: 'Guatemala', municipio: 'Guatemala'},
  // {numeral: '7ta avenida 203', type: 0, zona: 1, departamento: 'Guatemala', municipio: 'Guatemala'},
  // {numeral: '8ta avenida 203', type: 0, zona: 1, departamento: 'Guatemala', municipio: 'Guatemala'}
];

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  //validación de horientación y tamaño de pantalla
  stepperOrientation!: Observable<StepperOrientation>;

  isLinear = true;
  isTableEmpty = true;
  isAddButtonClickedSelect = true;

  estadosInfo: estadosmodel[] = [];
  categoriasInfo: categoriasModel[] = [];
  paisInfo: paisModel[] = [];
  departamentoInfo: departamentoModel[] = [];
  municipioInfo: municipioModel[] = [];
  zonasInfo: zonaModel[] = [];

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerEstados();
    this.obtenerPais();
    this.obtenerDepartamento();
    this.obtenerMunicipio();
    this.obtenerZona();
  }

  //validación de campos requeridos como obligatorios en formulario de datos personales
  datosFormGroup = this._formBuilder.group({
    codcliente: ['', Validators.required],
    primerNombre: ['', Validators.required],
    segundoNombre: ['', Validators.required],
    primerApellido: ['', Validators.required],
    segundoApellido: ['', Validators.required],
    nit: [0, Validators.required],
    numtelefono: [0, Validators.required]
  });

  categoriaControl = new FormControl('', [Validators.required]);
  estadoControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  //------------validación de campos requeridos como obligatorios en formulario de direcciones------------

  direccionFormGroup = this._formBuilder.group({
    direccion: ['', Validators.required],
    notaAdicionalControl: ['']
  });


  //validación de selectores, que sean requeridos y no pase si alguno está vacio.
  tipodireccionControl = new FormControl('', [Validators.required]);
  zonaControl = new FormControl('', [Validators.required]);
  departamentoControl = new FormControl('', [Validators.required]);
  municipioControl = new FormControl('', [Validators.required]);
  paisControl = new FormControl('', [Validators.required]);
  notaAdicionalControl = new FormControl('');

  formDirectionsGroup = new FormGroup({
    tdireccion: this.tipodireccionControl,
    zona: this.zonaControl,
    departamento: this.departamentoControl,
    municipio: this.municipioControl,
    pais: this.paisControl,
  })


  //agregar datos a la tabla de dirección
  displayedColumns: string[] = ['numeral', 'type', 'zona', 'departamento', 'municipio'];
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table!: MatTable<interfaceDireccion>;

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

  logs() {
    console.log('categoria: ', this.categoriaControl.value, ' estado: ', this.estadoControl.value);
    console.log('pais: ', this.paisControl.value , ' depto: ', this.departamentoControl.value, ' muni: ', this.municipioControl.value, ' zona: ', this.zonaControl.value);
  }

  obtenerZona(){
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


  addData() {
    this.logs();
    if (this.direccionFormGroup.valid && (this.formDirectionsGroup.valid)) {
      console.log('si pasa la primera validacion')
      const nuevadireccion: interfaceDireccion = {
        numeral: this.direccionFormGroup.get('direccion')?.value || '',
        type: this.tipodireccionControl.value || '',
        zona: this.zonaControl.value || '',
        departamento: this.departamentoControl.value || '',
        municipio: this.municipioControl.value || ''
      }

      this.dataSource.push(nuevadireccion);
      this.table.renderRows();
      this.direccionFormGroup.reset();
      this.formDirectionsGroup.reset();

      this.isTableEmpty = false;
      this.isAddButtonClickedSelect = false;
    } else {
      alert('Los datos de la dirección no son válidos');
    }
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();

    this.isTableEmpty = this.dataSource.length === 0;
  }


  // crearCliente(){
  //   if(this.datosFormGroup.valid && this.direccionFormGroup.valid && this.formDirectionsGroup.valid){

  //     const clientData: datosCliente = {
  //       primeR_NOMBRE: this.datosFormGroup.get('primerNombre')?.value || '',
  //       segundO_NOMBRE: this.datosFormGroup.get('segundoNombre')?.value || '',
  //       primeR_APELLIDO: this.datosFormGroup.get('primerApellido')?.value || '',
  //       segundO_APELLIDO: this.datosFormGroup.get('segundoApellido')?.value || '',
  //       nit: this.datosFormGroup.get('nit')?.value || 0,
  //       codigO_ESTADO    

  //     }


  //   }
  // }

}





//todo lo relacionado con el campo de email.
//valida correo
// email = new FormControl('', [Validators.required, Validators.email]);

// getErrorMessage() {
//   if (this.email.hasError('required')) {
//     return 'Valor requerido';
//   }

//   return this.email.hasError('email') ? 'Correo electrónico no válido' : '';
// }


//validación de tipo de usuario logeado
// usuario: number = 1;