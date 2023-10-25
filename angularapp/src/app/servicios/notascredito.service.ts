import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CodNotaCreditoModel, notascreditoModel } from '../modelos/notascredito.model';

@Injectable({
    providedIn: 'root'
})

export class NotasCreditoService {

    private urlAPI = 'https://localhost:7065/NotasCredito/';

    constructor(private http: HttpClient) { }

    public obtenerNotasCreditoApi(): Observable<notascreditoModel> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<notascreditoModel>(this.urlAPI + "getAllNotas", { headers: headers });
    }
    public obtenerNotaCreditoApi(CodNota: string): Observable<CodNotaCreditoModel> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<notascreditoModel>(this.urlAPI + "getNota", { headers: headers });
    }
    public guardaNotaCreditoApi(): Observable<notascreditoModel> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<notascreditoModel>(this.urlAPI + "GuardaNota", { headers: headers });
    }
    public ActualizaNotaCreditoApi(): Observable<notascreditoModel> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<notascreditoModel>(this.urlAPI + "ActualizaNota", { headers: headers });
    }
    public EliminaNotaCreditoApi(): Observable<notascreditoModel> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.delete<notascreditoModel>(this.urlAPI + "EliminaNota", { headers: headers });
    }

}