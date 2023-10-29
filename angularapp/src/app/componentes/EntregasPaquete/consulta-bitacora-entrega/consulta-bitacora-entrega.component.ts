import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { estadosmodel } from 'src/app/modelos/estados.model';
import { bitacoraModelo } from 'src/app/modelos/venta.model';
import { EstadosService } from 'src/app/servicios/estados.service';
import { VentaService } from 'src/app/servicios/venta.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-bitacora-entrega',
  templateUrl: './consulta-bitacora-entrega.component.html',
  styleUrls: ['./consulta-bitacora-entrega.component.css']
})
export class ConsultaBitacoraEntregaComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = false;
  estadosInfo: estadosmodel[] = [];
  datos = true
  dataSource: MatTableDataSource<bitacoraModelo>;
  private subscription?: Subscription[] = [];


  displayedColumns: string[] = ['codigoventa', 'fechaventa', 'Estado'];
  

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private ventaservice: VentaService,
    private estadoservice: EstadosService
  ) {
    this.dataSource = new MatTableDataSource<bitacoraModelo>([]);
  }

  ngOnInit(): void {
    this.subscription?.push(
      this.estadoservice.obtenerEstadosAPI().subscribe(
        (response) => {
          this.estadosInfo = response
        }
      )
    )
    this.bitacora();  
    
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  bitacora() {
    this.isLoading = true
    this.subscription?.push(
      this.ventaservice.bitacora().subscribe(
        (response) => {
          this.dataSource.data = response 
          this.isLoading = false
        },
        (error) => {
          this.errorServidor()
        }
      )
    )
  }

  errorServidor() {
    this.isLoading = false;
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      text: 'Ocurrio un error con el servidor.',
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2500
    })
  }
}
