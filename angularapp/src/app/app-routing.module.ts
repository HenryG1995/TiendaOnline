import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { CrearClienteComponent } from './componentes/Clientes/crear-cliente/crear-cliente.component';
import { ActualizarClienteComponent } from './componentes/Clientes/actualizar-cliente/actualizar-cliente.component';
import { ConsultarClienteComponent } from './componentes/Clientes/consultar-cliente/consultar-cliente.component';
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
import { ActualizaNotaComponent } from './componentes/NotasCredito/actualiza-nota/actualiza-nota.component';

const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'login', component:LoginComponent},
  { path: 'home', component:HomeComponent},
  { path: 'clientes/crearCliente', component:CrearClienteComponent},
  { path: 'clientes/consultarCliente', component:ConsultarClienteComponent},
  { path: 'clientes/actualizarCliente', component:ActualizarClienteComponent},
  { path: 'clientes/eliminarCliente', component:EliminarClienteComponent},
  { path: 'crearProducto', component:CrearProductoComponent},
  { path: 'consultarProducto', component:ConsultarProductoComponent},
  { path: 'actualizarProducto', component:ActualizarProductoComponent},
  { path: 'eliminarProducto', component:EliminarProductoComponent},
  { path: 'ventaMayor', component:VentaMayorComponent},
  { path: 'ventaMenor', component:VentaMenorComponent},
  { path: 'anularVenta', component:AnularVentaComponent},
  { path: 'actualizaNota', component:ActualizaNotaComponent},
  { path: 'devolucionProducto', component:DevolucionProductoComponent},
  { path: 'ingresoEntrega', component:IngresoEntregaComponent},
  { path: 'seguimientoEntrega', component:SeguimientoEntregaComponent},
  { path: 'bitacoraEntrega', component:ConsultaBitacoraEntregaComponent},
  { path: 'nosotros', component:NosotrosComponent},
  // { path: '**', pathMatch: 'full', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
