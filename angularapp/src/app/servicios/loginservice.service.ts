import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environmet';
import { UsuarioModel } from '../modelos/usuario.model';
import { login, loginModel } from '../modelos/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = environment.apiUrl;

  private usuarioSubject: BehaviorSubject<UsuarioModel>;
  public usuario: Observable<UsuarioModel>;

  public get usuarioData(): UsuarioModel {
    return this.usuarioSubject.value;
  }

  constructor(private http: HttpClient) {
    var local = localStorage.getItem('usuario')

    var resp = JSON.stringify(local)

    this.usuarioSubject = new BehaviorSubject<UsuarioModel>(JSON.parse(resp))
    this.usuario = this.usuarioSubject.asObservable();
    

  }

  public login(datos: loginModel): Observable<UsuarioModel> {

    console.log(datos)

    return this.http.post<UsuarioModel>(this.apiUrl + 'Usuarios/VALIDINFO', datos)
      .pipe(
        map(res => {

          var resultado = res
          console.log('resultadoooo: ' +res)

          var respuesta = JSON.stringify(resultado)
          console.log('respuesta: ' +respuesta)
          if (res.codigo !== null) {
            const usuario: UsuarioModel = JSON.parse(respuesta);            
            localStorage.setItem('usuario', JSON.stringify(usuario));
            this.usuarioSubject.next(usuario);
          }
          return res;
        })
      );
  }


  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(new UsuarioModel());
  }
}