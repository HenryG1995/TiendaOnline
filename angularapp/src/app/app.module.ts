import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

//importacion de angular material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';


//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { SideBarComponent } from './componentes/side-bar/side-bar.component';
import { CrearClienteComponent } from './componentes/Clientes/crear-cliente/crear-cliente.component';
import { ConsultarClienteComponent } from './componentes/Clientes/consultar-cliente/consultar-cliente.component';
import { ActualizarClienteComponent } from './componentes/Clientes/actualizar-cliente/actualizar-cliente.component';
import { EliminarClienteComponent } from './componentes/Clientes/eliminar-cliente/eliminar-cliente.component';
import { CrearProductoComponent } from './componentes/Productos/crear-producto/crear-producto.component';
import { ConsultarProductoComponent } from './componentes/Productos/consultar-producto/consultar-producto.component';
import { ActualizarProductoComponent } from './componentes/Productos/actualizar-producto/actualizar-producto.component';
import { EliminarProductoComponent } from './componentes/Productos/eliminar-producto/eliminar-producto.component';
import { VentaMayorComponent } from './componentes/Ventas/venta-mayor/venta-mayor.component';
import { VentaMenorComponent } from './componentes/Ventas/venta-menor/venta-menor.component';
import { AnularVentaComponent } from './componentes/NotasCredito/anular-venta/anular-venta.component';
import { DevolucionProductoComponent } from './componentes/NotasCredito/devolucion-producto/devolucion-producto.component';
import { IngresoEntregaComponent } from './componentes/EntregasPaquete/ingreso-entrega/ingreso-entrega.component';
import { SeguimientoEntregaComponent } from './componentes/EntregasPaquete/seguimiento-entrega/seguimiento-entrega.component';
import { ConsultaBitacoraEntregaComponent } from './componentes/EntregasPaquete/consulta-bitacora-entrega/consulta-bitacora-entrega.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SideBarComponent,
    CrearClienteComponent,
    ConsultarClienteComponent,
    ActualizarClienteComponent,
    EliminarClienteComponent,
    CrearProductoComponent,
    ConsultarProductoComponent,
    ActualizarProductoComponent,
    EliminarProductoComponent,
    VentaMayorComponent,
    VentaMenorComponent,
    AnularVentaComponent,
    DevolucionProductoComponent,
    IngresoEntregaComponent,
    SeguimientoEntregaComponent,
    ConsultaBitacoraEntregaComponent,
    NosotrosComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
