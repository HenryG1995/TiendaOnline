import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { ConsultaCliente } from 'src/app/modelos/cliente.model';
import { estadosmodel } from 'src/app/modelos/estados.model';
import { EstadosService } from 'src/app/servicios/estados.service';
import { MyErrorStateMatcher } from '../crear-cliente/crear-cliente.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-consultar-cliente',
  templateUrl: './consultar-cliente.component.html',
  styleUrls: ['./consultar-cliente.component.css']
})
export class ConsultarClienteComponent implements OnInit {
  isTableEmpty = true;
  displayedColumns: string[] = ['codigo', 'nombre', 'nit', 'direccion', 'estado', 'categoria', 'telefono'];


  estadosInfo: estadosmodel[] = [];
  clientesInfo: ConsultaCliente[] = [];

  consulta = new ConsultaCliente();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  currentPage = 0;
  itemsPerPage = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _formBuilder: FormBuilder,
    private clientservice: ClientesService,
    private estadosservice: EstadosService,) { }

  datosConsultaFormGroup = this._formBuilder.group({
    consultaCodigoControl: [''],
    primerNombreControl: [''],
    primerApellidoControl: [''],
    nitControl: [''],
    estadoControl: ['']
  });

  obtenerDatosConsulta() {
    this.consulta.CODIGO_CLIENTE = this.datosConsultaFormGroup.get('consultaCodigoControl')?.value?.toUpperCase() || "";
    this.consulta.PRIMER_NOMBRE = this.datosConsultaFormGroup.get('primerNombreControl')?.value?.toUpperCase() || "";
    this.consulta.PRIMER_APELLIDO = this.datosConsultaFormGroup.get('primerApellidoControl')?.value?.toUpperCase() || "";
    this.consulta.NIT = this.datosConsultaFormGroup.get('nitControl')?.value?.toUpperCase() || "";
    this.consulta.CODIGO_ESTADO = this.datosConsultaFormGroup.get('estadoControl')?.value?.toUpperCase() || "";

    console.log('codigo: ', this.consulta.CODIGO_CLIENTE)
    console.log('nombre: ', this.consulta.PRIMER_NOMBRE)
    console.log('apellido: ', this.consulta.PRIMER_APELLIDO)
    console.log('nit: ', this.consulta.NIT)
    console.log('estado: ', this.consulta.CODIGO_ESTADO)

    this.clientesInfo = [];

    //this.buscarCliente();
  }

  ngOnInit(): void {
    this.obtenerEStados();
  }

  obtenerEStados() {
    this.estadosservice.obtenerEstadosAPI().subscribe(
      (response: any) => {
        this.estadosInfo = response;
      },
      (error) => {
        console.error('Error en la solicitud de obtener estado ', error);
      }
    )
  }

  buscarCliente() {
    try {
      this.clientservice.GetClient(this.consulta).subscribe(
        (response: any) => {

          this.clientesInfo = response.map((item: any) => {
            Object.keys(item).forEach(key => {
              if (item[key] === null) item[key] = '';
            });
            return item;
          });

          this.resultsLength = this.clientesInfo.length;
          this.isTableEmpty = false;
          this.isLoadingResults = false;
          console.log('Esta es la información: ', this.clientesInfo);
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      );
    } catch (error) {
      console.error('Este es el error: ', error);
    }
  }


}