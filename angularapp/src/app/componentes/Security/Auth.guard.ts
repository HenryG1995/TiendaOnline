import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "src/app/servicios/loginservice.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(
        private router: Router,
        private authservice : LoginService
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const usuario = this.authservice.usuarioData;

        console.log('USUARIO EN GUARD: ['+usuario+']')

        if(usuario) {
            return true;
        }
    

        this.router.navigate(['/login']);
        return false;
    }
}