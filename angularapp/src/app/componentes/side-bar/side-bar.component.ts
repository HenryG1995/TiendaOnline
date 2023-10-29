import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/loginservice.service';

declare var $: any;

interface opciones {
  clienteSubmenu: boolean;
  productoSubmenu: boolean;
  ventaSubmenu: boolean;
  notaCreditoSubmenu: boolean;
  entregaPaqueteSubmenu: boolean;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, AfterViewInit{
  submenuAbierto: string | null = null;
  carga= true;

  submenusState: opciones = {
    clienteSubmenu: false,
    productoSubmenu: false,
    ventaSubmenu: false,
    notaCreditoSubmenu: false,
    entregaPaqueteSubmenu: false
  }

  toggleSubmenu(submenuName: keyof opciones) {
    if (this.submenuAbierto === submenuName) {
      this.submenuAbierto = null; //cierra el submenu que esta abierto si es el mismo
      this.submenusState[submenuName] = false;
    } else {
      this.submenusState[submenuName] = true;
      this.submenuAbierto = submenuName;
    }
  }

  ngOnInit(): void {
    this.initSidebarToggle();
    this.carga = false;
  }

  ngAfterViewInit(): void {
    
  }

  initSidebarToggle() {
    var fullHeight = function () {

      $('.js-fullheight').css('height', $(window).height());
      $(window).resize(function () {
        $('.js-fullheight').css('height', $(window).height());
      });

    };
    fullHeight();

    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
  }

  constructor(private loginservice: LoginService){}

  logout(){
    this.loginservice.logout();
  }
}
