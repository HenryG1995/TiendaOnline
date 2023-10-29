import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { loginModel } from 'src/app/modelos/login.model';
import { LoginService } from 'src/app/servicios/loginservice.service';
import Swal from 'sweetalert2';


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

  isLoading = false
  usuario = ""//A7EC6AC892634170BE7BE46B8FB0E179
  pass = ""
  respuesta: string = "";

  loginn = true;
  logon = false;

  user = new loginModel()

  private subscription?: Subscription[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {

    window.addEventListener('beforeunload', () => {
      this.isLoading = true;
    });
  }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  login() {
    this.user.usuario = this.usuario;
    this.user.pass = this.pass;


    this.loginService.login(this.user).subscribe(async (data: any) => {
      this.validarLogin(await data)
    })
  }

  validarLogin(cadena: loginModel[]) {

    console.log(cadena.length)

    console.log(JSON.stringify(cadena))

    if (cadena.length === 0) {
      console.log("HOLA TESTER")
      this.passIncorrect();
    }
    else {

      this.loginn = false;
      this.logon = true;
      this.router.navigate(['/']);
    }
  }

  passIncorrect() {
    this.isLoading = false
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      text: 'Código o contraseña incorrecto.',
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2500
    })
  }


}