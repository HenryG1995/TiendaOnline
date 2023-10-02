import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, DatePipe } from '@angular/common';
import { ClientesService, datosCliente } from 'src/app/servicios/clientes.service';
import { ConsultaCliente } from 'src/app/modelos/cliente.model';
import { estadosmodel } from 'src/app/modelos/estados.model';
import { EstadosService } from 'src/app/servicios/estados.service';

@Component({
  selector: 'app-consultar-cliente',
  templateUrl: './consultar-cliente.component.html',
  styleUrls: ['./consultar-cliente.component.css']
})
export class ConsultarClienteComponent implements OnInit {
  isTableEmpty = true;

  displayedColumns: string[] = ['codigo', 'nombre', 'nit', 'direccion', 'estado', 'categoria', 'telefono'];

  clientesInfo: datosCliente[] = [];  

  consulta: ConsultaCliente = new ConsultaCliente();

  codigoCliente: string = "24A0207BBCC34856843C86FE5761B674";

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientservice: ClientesService, private _httpClient: HttpClient, private estadosservice: EstadosService) { }

  ngOnInit(): void {
    
  }


  buscarCliente() {
    try {
      this.clientservice.GetClient(this.consulta).subscribe(
        (response: any) => {
          this.clientesInfo = response;
          console.log('esta es la informacion: ', response);
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      )
    } catch (error) {
      console.error('Este es el error: ', error)
    }
  }
}