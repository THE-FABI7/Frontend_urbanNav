import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configuracionRutasBackend } from '../config/configuracion-rutas-backend';
import { Observable, map } from 'rxjs';
import { ComentarioModel } from '../model/comentario.model';
import { viaje } from '../model/viaje.model';

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
    return this.http.get<ComentarioModel[]>(`${this.urlBase}comentario`, {
      headers,
    });
  }

  //dado unas datos quiero una funcion listarViajesPorId que me returne los viajes en los cuales estan los datos
  

  listarViajes(): Observable<viaje[]> {
    let usuarioValidado = localStorage.getItem('datos-sesion');
    const token = usuarioValidado ? JSON.parse(usuarioValidado).token : '';
    // Crea un objeto HttpHeaders y establece el token de autorización
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<viaje[]>(`${this.urlBase}viaje`, { headers });
  }
}
