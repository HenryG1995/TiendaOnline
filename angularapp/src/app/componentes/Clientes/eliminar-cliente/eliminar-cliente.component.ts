import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { ConsultaCliente } from 'src/app/modelos/cliente.model';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css']
})
export class EliminarClienteComponent implements OnInit {

  isFill = false;

  clienteInfo = new ConsultaCliente();

  constructor(private _formBuilder: FormBuilder) { }

  codigoFormGroup = this._formBuilder.group({
    codclienteControl: ['', Validators.required]
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

  }

  buscarCliente() {
    //d this.datosFormGroup.reset();
    // this.clienteInfo = new ConsultaCliente();
    if (this.codigoFormGroup.valid) {
      
      this.clienteInfo.PRIMER_NOMBRE = this.clienteInfo.PRIMER_NOMBRE + ' Ronichi' + this.clienteInfo.SEGUNDO_NOMBRE + ' ' + this.clienteInfo.PRIMER_APELLIDO + ' ' + this.clienteInfo.SEGUNDO_APELLIDO || ''
      this.clienteInfo.DIRECCION_CLIENTE = 'En la bendición de yisus' || ''
      this.clienteInfo.NIT = '88007995' || ''
      this.clienteInfo.TELEFONO = 911 || 0
      this.clienteInfo.CODIGO_ESTADO = 'en depre' || ''
      this.clienteInfo.CODIGO_CATEGORIA = 'saquenme de aki' || ''

      console.log('this.clienteInfo.PRIMER_NOMBRE: [', this.clienteInfo.PRIMER_NOMBRE + ']')
      console.log('this.clienteInfo.PRIMER_NOMBRE: [', this.clienteInfo.DIRECCION_CLIENTE + ']')
      console.log('this.clienteInfo.PRIMER_NOMBRE: [', this.clienteInfo.NIT + ']')
      console.log('this.clienteInfo.PRIMER_NOMBRE: [', this.clienteInfo.TELEFONO + ']')
      console.log('this.clienteInfo.PRIMER_NOMBRE: [', this.clienteInfo.CODIGO_ESTADO + ']')
      console.log('this.clienteInfo.PRIMER_NOMBRE: [', this.clienteInfo.CODIGO_CATEGORIA + ']')

      this.isFill = true
    }else {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        text: 'Debe de ingresar el código del cliente.',
        showConfirmButton: false,
        timer: 2500
      }).then(e =>{
        this.isFill = false
      });
    }

  }

  eliminarCliente() {
    console.log('Elimina al cliente', this.codigoFormGroup.get('codclienteControl')?.value)

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      text: 'Cliente eliminado exitosamente.',
      showConfirmButton: false,
      timer: 2500
    });

    this.limpiaPantalla();

  }

  limpiaPantalla() {
    this.isFill = false;

    this.codigoFormGroup.reset();
    this.datosFormGroup.reset();

  }

}
