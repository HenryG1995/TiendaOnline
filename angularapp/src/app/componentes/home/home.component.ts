import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('cuadrosIcono', { static: true }) cuadrosIcono!: ElementRef[];
  @ViewChild('contadorClientes', { static: true }) contadorClientesElement!: ElementRef;
  @ViewChild('contadorProductos', { static: true }) contadorProductosElement!: ElementRef;
  @ViewChild('contadorVentas', { static: true }) contadorVentasElement!: ElementRef;
  @ViewChild('contadorIngresos', { static: true }) contadorIngresosElement!: ElementRef;

  //variables para manejo de ejectos en los botones
  botonSeleccionado = 'btnHoy';
  botonClicado = false;

  //variables para manejo de contador
  clientes = 0;
  productos = 0;
  ventas = 0;
  ingresos = 0;

  targetClientes = 0;
  targetProductos = 0;
  targetVentas = 0;
  targetIngresos = 0;

  constructor(private http: HttpClient, private renderer: Renderer2, private cdr: ChangeDetectorRef) { }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  seleccionarBoton(boton: string) {
    console.log('el valor del boton es: [' + boton + ']');
    this.botonSeleccionado = boton;
    this.botonClicado = true;

    this.targetClientes = 0;
    this.targetProductos = 0;
    this.targetVentas = 0;
    this.targetIngresos = 0;

    const icono = document.querySelectorAll('.cuadro-con-icono');
    if (icono) {
      icono.forEach(element => {
        // element.classList.add('vibrar');
        this.renderer.addClass(element, 'vibrar');
      });
    }

    switch (boton) {
      case 'btnHoy':
        this.obtenerDatosHoy();
        break;
      case 'btnAyer':
        this.obtenerDatosAyer();
        break;
      case 'btnSemana':
        this.obtenerDatosEstaSemana();
        break;
      case 'btnSemAnterior':
        this.obtenerDatosSemanaAnterior();
        break;
      case 'btnEsteMes':
        this.obtenerDatosEsteMes();
        break;
      case 'btnEsteAnio':
        this.obtenerDatosEsteAnio();
        break;
    }

    setTimeout(() => {
      this.botonClicado = false;

      if (icono) {
        icono.forEach(element => {
          // element.classList.remove('vibrar');
          this.renderer.removeClass(element, 'vibrar');
        });
      }
    }, 1000);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.obtenerDatosHoy();
    //this.seleccionarBoton(this.botonSeleccionado);

    // Ejecuta seleccionarBoton después de un pequeño retraso para permitir la detección de cambios inicial
    setTimeout(() => {
      this.seleccionarBoton(this.botonSeleccionado);
      // Forzar la detección de cambios para actualizar la vista después de seleccionar el botón
      this.cdr.detectChanges();
    }, 0);
  }

  datosAnimacion(clientes: number, productos: number, ventas: number, ingresos: number) {
    this.animateConteo(clientes, this.contadorClientesElement, this.clientes);
    this.animateConteo(productos, this.contadorProductosElement, this.productos);
    this.animateConteo(ventas, this.contadorVentasElement, this.ventas);
    this.animateConteo(ingresos, this.contadorIngresosElement, this.ingresos);
  }

  animateConteo(target: number, contadorElement: ElementRef, currentValue: number) {

    const duration = 1000;
    const fps = 60;
    const increment = (target - currentValue) / (duration / 2000 * fps);

    const animate = () => {
      currentValue += increment;
      contadorElement.nativeElement.textContent = Math.round(currentValue).toString();
      if (currentValue + 1 < target) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }







  //-----------------------------Metodos de consumo de APIs-----------------------------//

  obtenerDatosHoy() {
    setTimeout(() => {
      this.targetClientes = 100;
      this.targetProductos = 100;
      this.targetVentas = 100;
      this.targetIngresos = 1000;

      this.datosAnimacion(this.targetClientes, this.targetProductos, this.targetVentas, this.targetIngresos);
    }, 1000);

    // this.http.get<Datos>('https://datos/objeto').subscribe((data: Datos) => {
    //   this.clientes = data.clientes;
    //   this.productos = data.productos;
    //   this.ventas = data.ventas;
    //   this.ingresos = data.ingresos;
    // });
  }

  obtenerDatosAyer() {
    // this.http.get<any>(API_BASE_URL + 'datosAyer').subscribe((data) => {
    //   // Procesa la respuesta y actualiza las propiedades según sea necesario
    // });
    setTimeout(() => {
      this.targetClientes = 200;
      this.targetProductos = 200;
      this.targetVentas = 200;
      this.targetIngresos = 2000;

      this.datosAnimacion(this.targetClientes, this.targetProductos, this.targetVentas, this.targetIngresos);
    }, 1000);
  }

  obtenerDatosEstaSemana() {
    // this.http.get<any>(API_BASE_URL + 'datosEstaSemana').subscribe((data) => {
    //   // Procesa la respuesta y actualiza las propiedades según sea necesario
    // });
    setTimeout(() => {
      this.targetClientes = 300;
      this.targetProductos = 300;
      this.targetVentas = 300;
      this.targetIngresos = 3000;

      this.datosAnimacion(this.targetClientes, this.targetProductos, this.targetVentas, this.targetIngresos);
    }, 1000);
  }

  obtenerDatosSemanaAnterior() {
    // this.http.get<any>(API_BASE_URL + 'datosSemanaAnterior').subscribe((data) => {
    //   // Procesa la respuesta y actualiza las propiedades según sea necesario
    // });

    setTimeout(() => {
      this.targetClientes = 400;
      this.targetProductos = 400;
      this.targetVentas = 400;
      this.targetIngresos = 4000;

      this.datosAnimacion(this.targetClientes, this.targetProductos, this.targetVentas, this.targetIngresos);
    }, 1000);
  }

  obtenerDatosEsteMes() {
    // this.http.get<any>(API_BASE_URL + 'datosEsteMes').subscribe((data) => {
    //   // Procesa la respuesta y actualiza las propiedades según sea necesario
    // });

    setTimeout(() => {
      this.targetClientes = 500;
      this.targetProductos = 500;
      this.targetVentas = 500;
      this.targetIngresos = 5000;

      this.datosAnimacion(this.targetClientes, this.targetProductos, this.targetVentas, this.targetIngresos);
    }, 1000);
  }

  obtenerDatosEsteAnio() {
    // this.http.get<any>(API_BASE_URL + 'datosEsteAno').subscribe((data) => {
    //   // Procesa la respuesta y actualiza las propiedades según sea necesario
    // });
    setTimeout(() => {
      this.targetClientes = 600;
      this.targetProductos = 600;
      this.targetVentas = 600;
      this.targetIngresos = 6000;

      this.datosAnimacion(this.targetClientes, this.targetProductos, this.targetVentas, this.targetIngresos);
    }, 1000);
  }

}
