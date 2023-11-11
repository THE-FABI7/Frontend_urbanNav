import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { usuarioModel } from '../model/usuario.model';
import { HttpClient } from '@angular/common/http';
import { configuracionRutasBackend } from '../config/configuracion-rutas-backend';
import { itemMenuModel } from '../model/item.menu.model';
import { usuarioValidadoModel } from '../model/usuario.validado.model';
import { permisosModel } from '../model/permisos.model';
import { ConfiguracionMenuLateral } from '../config/configuracionMenuLateral';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  urlBase: string = configuracionRutasBackend.urlSeguridad;
  constructor(private http: HttpClient) {}

  /**
   * La función "IdentificarUsuario" toma como parámetros un nombre de usuario y contraseña, envía una
   * solicitud POST al servidor con los datos proporcionados y devuelve un Observable de tipo
   * "usuarioModel".
   * @param {string} usuario - Una cadena que representa el nombre de usuario o correo electrónico del
   * usuario.
   * @param {string} clave - El parámetro "clave" es una cadena que representa la contraseña o clave
   * secreta del usuario.
   * @returns un Observable de tipo `usuarioModel`.
   */
  IdentificarUsuario(usuario: string, clave: string): Observable<usuarioModel> {
    return this.http.post<usuarioModel>(`${this.urlBase}identificar-usuario`, {
      correo: usuario,
      clave: clave,
    });
  }

  /**
   * La función "AlmacenarDatosUsuarioIdentificado" almacena los datos del usuario identificado en el
   * almacenamiento local y devuelve un valor booleano que indica si los datos se almacenaron
   * exitosamente.
   * @param {usuarioModel} datos - El parámetro "datos" es de tipo "usuarioModel", que es un modelo o
   * interfaz que representa la estructura de datos de un usuario.
   * @returns un valor booleano. Devuelve verdadero si los datos se almacenaron correctamente en el
   * almacenamiento local y falso si ya hay datos almacenados en el almacenamiento local.
   */
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

  /**
   * La función "obtenerDatosUsuarioLS" recupera los datos del usuario del almacenamiento local y los
   * devuelve como un objeto o nulo si no se encuentran datos.
   * @returns La función `obtenerDatosUsuarioLS` devuelve un objeto de tipo `usuarioModel` o `null`.
   */
  obtenerDatosUsuarioLS(): usuarioModel | null {
    let datosLS = localStorage.getItem('datos-usuario');
    if (datosLS) {
      let datos = JSON.parse(datosLS);
      return datos;
    } else {
      return null;
    }
  }

  /**
   * La función `validarCodigo2FA` envía una solicitud POST para verificar el código 2FA de un usuario.
   * @param {string} idUser - Una cadena que representa el ID de usuario.
   * @param {string} codigo - El parámetro "codigo" es una cadena que representa el código 2FA ingresado
   * por el usuario para su verificación.
   * @returns un Observable de tipo `usuarioValidadoModel`.
   */
  validarCodigo2FA(
    idUser: string,
    codigo: string
  ): Observable<usuarioValidadoModel> {
    return this.http.post<usuarioValidadoModel>(
      `${this.urlBase}verificar-codigo2fa`,
      {
        usuarioId: idUser,
        codigo2fa: codigo,
      }
    );
  }

  /**
   * La función "ObtenerItemsMenuLateral" recupera los elementos de un menú lateral del almacenamiento
   * local y los devuelve como una matriz de objetos itemMenuModel.
   * @returns una matriz de objetos itemMenuModel.
   */
  ObtenerItemsMenuLateral(): itemMenuModel[] {
    let menu: itemMenuModel[] = [];
    let menustr = localStorage.getItem('menu-lateral');
    if (menustr) {
      menu = JSON.parse(menustr);
    }
    return menu;
  }

  /**
   * La función "AlmacenarDatosUsuarioValidado" almacena los datos del usuario validados en el
   * almacenamiento local y devuelve un valor booleano que indica si los datos se almacenaron
   * correctamente.
   * @param {usuarioValidadoModel} datos - El parámetro "datos" es de tipo "usuarioValidadoModel", que
   * es un modelo que representa datos de usuario validados.
   * @returns un valor booleano. Si la condición `datosLS != null` es verdadera, devuelve `falso`. De lo
   * contrario, devuelve "verdadero".
   */
  AlmacenarDatosUsuarioValidado(datos: usuarioValidadoModel): boolean {
    let datosLS = localStorage.getItem('datos-sesion');
    if (datosLS != null) {
      return false;
    } else {
      let datosString = JSON.stringify(datos);
      localStorage.setItem('datos-sesion', datosString);
      this.ActualizarComportamientoUsuario(datos);
      return true;
    }
  }

  ActualizarComportamientoUsuario(datos: usuarioValidadoModel) {
    return this.datosUsuarioValidado.next(datos);
  }

  /**
   * La función "ConstruirMenuLateral" construye un menú lateral basado en una lista de permisos.
   * @param {permisosModel[]} permisos - El parámetro "permisos" es una matriz de objetos
   * "permisosModel".
   */
  ConstruirMenuLateral(permisos: permisosModel[]) {
    let menu: itemMenuModel[] = [];

    // console.log(permisos);

    permisos.forEach((permiso) => {
      let datosRuta = ConfiguracionMenuLateral.listaMenus.filter(
        (x) => x.id == permiso.menuId
      );

      console.log(datosRuta);
      if (datosRuta.length > 0) {
        let item = new itemMenuModel();
        item.idMenu = permiso.menuId;
        item.ruta = datosRuta[0].ruta;
        item.icono = datosRuta[0].icono;
        item.texto = datosRuta[0].texto;
        menu.push(item);
      }
    });
    this.AlmacenarItemsMenuLateral(menu);
  }

  /**
   * La función almacena los elementos de un menú lateral en el almacenamiento local como una cadena
   * JSON.
   * @param {itemMenuModel[]} itemsMenu - El parámetro `itemsMenu` es una matriz de objetos
   * `itemMenuModel`.
   */
  AlmacenarItemsMenuLateral(itemsMenu: itemMenuModel[]) {
    let menuStr = JSON.stringify(itemsMenu);
    localStorage.setItem('menu-lateral', menuStr);
  }

  datosUsuarioValidado = new BehaviorSubject<usuarioValidadoModel>(
    new usuarioValidadoModel()
  );

  ObtenerDatosSesion(): Observable<usuarioValidadoModel> {
    return this.datosUsuarioValidado.asObservable();
  }

  validacionDeSesion(): usuarioValidadoModel | null {
    let ls = localStorage.getItem('datos-sesion');
    if (ls) {
      let objUsuario = JSON.parse(ls);
      this.ActualizarComportamientoUsuario(objUsuario);
      return objUsuario;
    }
    return null;
  }

  RemoverDatosUsuarioValidado() {
    let datosUsuario = localStorage.getItem('datos-usuario');
    let datosSesion = localStorage.getItem('datos-sesion');
    if (datosUsuario) {
      localStorage.removeItem('datos-usuario');
    }
    if (datosSesion) {
      localStorage.removeItem('datos-sesion');
    }
    localStorage.removeItem('menu-lateral');
    this.ActualizarComportamientoUsuario(new usuarioValidadoModel());
  }

  RecuperarClavePorUsuario(usuario: string): Observable<usuarioModel> {
    return this.http.post<usuarioModel>(`${this.urlBase}recuperar-clave`, {
      correo: usuario,
    });
  }

  RegistrarUsuarioPublico(datos: any): Observable<usuarioModel> {
    return this.http.post<usuarioModel>(
      `${this.urlBase}usuario-publico`,
      datos
    );
  }

  ValidarHashUsuarioPublico(hash: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.urlBase}validar-hash-usuario`, {
      codigoHash: hash,
    });
  }

  obtenerCorreo(): string {
    let datosSesion = localStorage.getItem('datos-sesion');

    if (datosSesion) {
      let ds = JSON.parse(datosSesion);
      let correo = ds.user.correo;
      console.log(correo);
      return correo;
    }
    return '';
  }
  obtenerIdUsuario(): string {
    let datosSesion = localStorage.getItem('datos-sesion');

    if (datosSesion) {
      let ds = JSON.parse(datosSesion);
      let idUsuario = ds.user.id;
      console.log(idUsuario);
      return idUsuario;
    }
    return '';
  }
  obtenerNombreCompleto(): string {
    let datosSesion = localStorage.getItem('datos-sesion');

    if (datosSesion) {
      let ds = JSON.parse(datosSesion);
      let nombreCompleto = ds.user.Nombre + ' ' + ds.user.Apellido;
      console.log(nombreCompleto);
      return nombreCompleto;
    }
    return '';
  }
}
