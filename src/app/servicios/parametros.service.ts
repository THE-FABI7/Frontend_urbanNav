import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configuracionRutasBackend } from '../config/configuracion-rutas-backend';
import { Observable } from 'rxjs';
import { ComentarioModel } from '../model/comentario.model';

@Injectable({
  providedIn: 'root',
})
export class ParametrosService {
  urlBase: string = configuracionRutasBackend.urlLogica;
  constructor(private http: HttpClient) {}

  listarRegistros(): Observable<ComentarioModel[]> {
    let usuarioValidado = localStorage.getItem('datos-sesion');
    const token = usuarioValidado ? JSON.parse(usuarioValidado).token : '';
    // Crea un objeto HttpHeaders y establece el token de autorización
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<ComentarioModel[]>(`${this.urlBase}comentario`, { headers });
  }
}
