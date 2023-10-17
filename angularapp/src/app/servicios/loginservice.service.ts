import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { loginModel, loginModelo } from '../modelos/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {



  constructor(private router: Router, private http: HttpClient) { }

  login(usuario: loginModel): Observable<loginModelo[]>{
    return this.http.post<loginModelo[]>('https://localhost:7065/Usuarios/ConsultaUsuario', usuario)
  }

}
