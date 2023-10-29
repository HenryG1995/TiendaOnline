import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { UsuarioModel } from './modelos/usuario.model';
import { LoginService } from './servicios/loginservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  carga = false;



  usuario?: UsuarioModel;
  loggin = true;
  menu = false;

  constructor(


    public authservice: LoginService,
    private router: Router) {

    this.loggin = true;
    this.menu = false;

    console.log("ingreso : usuraio: " + this.usuario)



    this.authservice.usuario.subscribe(
      res => {

        console.log('quiero saber: ' + res)
        this.usuario = res;

        if (res === null) {
          this.loggin = true;
          this.menu = false;
        }
        console.log('cambio el objeto: ' + res)
        if (res) {
          this.menu = true;
          this.loggin = false;
        }
      }
    )
  }

  ngOnInit(): void {

    window.addEventListener('beforeunload', () => {
      this.carga = false;
    });

  }

  ngOnDestroy(): void {
    localStorage.clear();
  }

}

