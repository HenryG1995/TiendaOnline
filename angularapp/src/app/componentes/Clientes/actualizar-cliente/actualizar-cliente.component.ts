import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error cuando un control ha sido modificado, en este caso para validar la selección de tipo cliente */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface datosCliente {
  primerNombre: string,
  segundoNombre: string,
  primerApellido: string,
  segundoApellido: string,
  nit: string,
  correo: string,
  tipocliente: string,
  direccion: interfaceDireccion
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
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent {
  isLinear = true;
  isTableEmpty = true;
  isAddButtonClickedSelect = true;

  //validación de tipo de usuario logeado
  usuario: number = 1;

  ngOnInit(): void {

  }

  //validación de campos requeridos como obligatorios en formulario de datos personales
  firstFormGroup = this._formBuilder.group({
    primerNombre: ['', Validators.required],
    segundoNombre: ['', Validators.required],
    primerApellido: ['', Validators.required],
    segundoApellido: ['', Validators.required],
    nit: ['', Validators.required]
  });

  //valida correo
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Valor requerido';
    }

    return this.email.hasError('email') ? 'Correo electrónico no válido' : '';
  }

  //validación tipo cliente
  selected = new FormControl('client');
  matcher = new MyErrorStateMatcher();


  //------------validación de campos requeridos como obligatorios en formulario de direcciones------------

  secondFormGroup = this._formBuilder.group({
    direccion: ['', Validators.required]

  });


  //validación de selectores, que sean requeridos y no pase si alguno está vacio.
  tipodireccionControl = new FormControl('', [Validators.required]);
  zonaControl = new FormControl('', [Validators.required]);
  departamentoControl = new FormControl('', [Validators.required]);
  municipioControl = new FormControl('', [Validators.required]);

  formDirectionsGroup = new FormGroup({
    tdireccion: this.tipodireccionControl,
    zona: this.zonaControl,
    departamento: this.departamentoControl,
    municipio: this.municipioControl
  })


  //agregar datos a la tabla de dirección
  displayedColumns: string[] = ['numeral', 'type', 'zona', 'departamento', 'municipio'];
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table!: MatTable<interfaceDireccion>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }


  addData() {

    if (this.secondFormGroup.valid && (this.formDirectionsGroup.valid)) {
      console.log('si pasa la primera validacion')
      const nuevadireccion: interfaceDireccion = {
        numeral: this.secondFormGroup.get('direccion')?.value || '',
        type: this.tipodireccionControl.value || '',
        zona: this.zonaControl.value || '',
        departamento: this.departamentoControl.value || '',
        municipio: this.municipioControl.value || ''
      }

      this.dataSource.push(nuevadireccion);
      this.table.renderRows();
      this.secondFormGroup.reset();
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



  //validación de horientación y tamaño de pantalla
  stepperOrientation!: Observable<StepperOrientation>;

}
