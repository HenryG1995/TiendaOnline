import { Component, OnInit } from '@angular/core';

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
export class SideBarComponent implements OnInit{
  submenuAbierto: string | null = null;

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
}
