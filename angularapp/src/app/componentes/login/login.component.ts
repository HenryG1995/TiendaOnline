import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginModel, loginModelo } from 'src/app/modelos/login.model';
import { LoginserviceService } from 'src/app/servicios/loginservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: '*', opacity: 0 }),
            animate('500ms ease-in-out')
          ]
        ),

      ]
    )
  ]
})
export class LoginComponent implements OnInit {

  usuario = "A7EC6AC892634170BE7BE46B8FB0E179"
  pass = ""
  respuesta: string = "";

  user = new loginModel()


  constructor(
    private loginService: LoginserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  login() {
    this.user.codigO_CLIENTE = this.usuario;

    this.loginService.login(this.user).subscribe(async (data: any) => {
      this.validarLogin(await data)
    })
  }

  validarLogin(cadena: loginModelo[]) {

    console.log(cadena.length)

    console.log(JSON.stringify(cadena))

    if (cadena.length === 0) {
      console.log("HOLA TESTER")

    }
    else {

      let usuario = cadena[0];

      console.log("BIENVENIDO A ESTA APLICACION: " + usuario.codigO_USUARIO + " " + usuario.useR_ID + " " + usuario.estado);

      sessionStorage.setItem('codigo', usuario.codigO_USUARIO);
      sessionStorage.setItem('correo', usuario.correo);
      sessionStorage.setItem('estado', String(usuario.estado));
      sessionStorage.setItem('ID', String(usuario.useR_ID));

      let misesion = window.sessionStorage.getItem("ID");
      console.log("VARIABLE DE SESION -- " + misesion);

      this.router.navigate(['/principalside']);
    }
  }


}