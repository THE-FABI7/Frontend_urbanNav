import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuarioModel } from '../model/usuario.model';
import { HttpClient } from '@angular/common/http';
import { configuracionRutasBackend } from '../config/configuracion-rutas-backend';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  urlBase: string = configuracionRutasBackend.urlSeguridad;
  constructor(private http: HttpClient) {}

  IdentificarUsuario(usuario: string, clave: string): Observable<usuarioModel> {
    return this.http.post<usuarioModel>(`${this.urlBase}identificar-usuario`, {
      correo: usuario,
      clave: clave,
    });
  }

  AlmacenarDatosUsuarioIdentificado(datos: usuarioModel): boolean {
    let cadena = JSON.stringify(datos);
    try {
      let objeto = JSON.parse(cadena) as usuarioModel;
    } catch (error) {
      console.log(error);
    }
    let datosLS = localStorage.getItem('datos-usuario');
    if (datosLS !== null && datosLS !== undefined) {
      return false;
    } else {
      localStorage.setItem('datos-usuario', cadena);
      return true;
    }
  }

  obtenerDatosUsuarioLS(): usuarioModel | null {
    let datosLS = localStorage.getItem('datos-usuario');
    if (datosLS) {
      let datos = JSON.parse(datosLS);
      return datos;
    } else {
      return null;
    }
  }
}
