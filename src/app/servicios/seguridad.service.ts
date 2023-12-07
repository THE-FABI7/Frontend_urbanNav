import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { usuarioModel } from '../model/usuario.model';
import { HttpClient } from '@angular/common/http';
import { configuracionRutasBackend } from '../config/configuracion-rutas-backend';
import { itemMenuModel } from '../model/item.menu.model';
import { usuarioValidadoModel } from '../model/usuario.validado.model';
import { permisosModel } from '../model/permisos.model';
import { ConfiguracionMenuLateral } from '../config/configuracionMenuLateral';
import { configRoles } from '../config/configuracion-roles';
import { formulario } from '../model/pqrs-model';
import { conductorModel } from '../model/conductor.model';
import { cambiarclavemodel } from '../model/cambiarclave.model';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  urlBase: string = configuracionRutasBackend.urlSeguridad;
  urlLogica: string = configuracionRutasBackend.urlLogica;
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

  /**
   * La función "ActualizarComportamientoUsuario" actualiza el comportamiento de un usuario validado.
   * @param {usuarioValidadoModel} datos - El parámetro "datos" es de tipo "usuarioValidadoModel", que
   * es un modelo que representa datos de usuario validados.
   * @returns el resultado de llamar al método `next` sobre el objeto `datosUsuarioValidado`, pasando
   * el parámetro `datos`.
   */
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

  /**
   * La función "ObtenerDatosSesion" devuelve un Observable de tipo "usuarioValidadoModel" que
   * representa los datos del usuario validado.
   * @returns El método `ObtenerDatosSesion()` está devolviendo un `Observable` de tipo
   * `usuarioValidadoModel`.
   */
  ObtenerDatosSesion(): Observable<usuarioValidadoModel> {
    return this.datosUsuarioValidado.asObservable();
  }

  /**
   * La función "validacionDeSesion" comprueba si hay una sesión válida almacenada en el almacenamiento
   * local y devuelve el objeto de usuario si existe, en caso contrario devuelve nulo.
   * @returns ya sea un objeto de tipo `usuarioValidadoModel` si hay una sesión válida almacenada en el
   * almacenamiento local, o `null` si no hay una sesión válida.
   */
  validacionDeSesion(): usuarioValidadoModel | null {
    let ls = localStorage.getItem('datos-sesion');
    if (ls) {
      let objUsuario = JSON.parse(ls);
      this.ActualizarComportamientoUsuario(objUsuario);
      return objUsuario;
    }
    return null;
  }

  /**
   * La función "RemoverDatosUsuarioValidado" elimina los datos del usuario validados del
   * almacenamiento local y actualiza el comportamiento del usuario.
   */
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

  /**
   * La función "RecuperarClavePorUsuario" envía una solicitud POST al servidor para recuperar la
   * contraseña de un usuario mediante su correo electrónico.
   * @param {string} usuario - El parámetro `usuario` es una cadena que representa el nombre de usuario
   * o correo electrónico del usuario del cual desea recuperar la contraseña.
   * @returns un Observable de tipo `usuarioModel`.
   */
  RecuperarClavePorUsuario(usuario: string): Observable<usuarioModel> {
    return this.http.post<usuarioModel>(`${this.urlBase}recuperar-clave`, {
      correo: usuario,
    });
  }

  /**
   * La función `CambiarClave` envía una solicitud PATCH a la URL especificada con los datos
   * proporcionados y devuelve un Observable de tipo `cambiarclavemodel`.
   * @param {any} datos - El parámetro "datos" es de tipo "cualquiera", lo que significa que puede ser
   * cualquier tipo de dato. Se utiliza como carga útil para la solicitud HTTP PATCH al punto final
   * "cambiar-clave".
   * @returns un Observable de tipo "cambiarclavemodel".
   */
  CambiarClave(datos: any): Observable<cambiarclavemodel> {
    return this.http.patch<cambiarclavemodel>(
      `${this.urlBase}cambiar-clave`,
      datos
    );
  }

  /**
   * La función `RegistrarUsuarioPublico` envía una solicitud POST al servidor para registrar un nuevo
   * usuario público con los datos proporcionados.
   * @param {any} datos - El parámetro "datos" es de tipo "cualquiera", lo que significa que puede
   * aceptar cualquier tipo de datos. Representa los datos que se enviarán en la solicitud HTTP POST
   * para crear un nuevo usuario público.
   * @returns un Observable de tipo `usuarioModel`.
   */
  RegistrarUsuarioPublico(datos: any): Observable<usuarioModel> {
    return this.http.post<usuarioModel>(
      `${this.urlBase}usuario-publico`,
      datos
    );
  }

  /**
   * La función `RegistrarConductor` envía una solicitud POST al servidor para registrar un nuevo
   * conductor con los datos proporcionados.
   * @param {any} datos - El parámetro "datos" es de tipo "cualquiera", lo que significa que puede
   * aceptar cualquier tipo de datos. Se utiliza como carga útil para la solicitud HTTP POST.
   * @returns un Observable de tipo conductorModel.
   */
  RegistrarConductor(datos: any): Observable<conductorModel> {
    return this.http.post<conductorModel>(
      `${this.urlBase}conductor-publico`,
      datos
    );
  }

  /**
   * La función `RegistrarConductorLogica` envía una solicitud POST a una URL específica con los datos
   * proporcionados y devuelve un Observable de tipo `conductorModel`.
   * @param {any} datos - El parámetro "datos" es de tipo "cualquiera", lo que significa que puede
   * aceptar cualquier tipo de datos. Se utiliza como carga útil para la solicitud HTTP POST a la URL
   * especificada.
   * @returns un Observable de tipo conductorModel.
   */
  RegistrarConductorLogica(datos: any): Observable<conductorModel> {
    return this.http.post<conductorModel>(
      `${this.urlLogica}conductor-publico`,
      datos
    );
  }

  /**
   * La función `RegistroClienteLogica` envía una solicitud POST a una URL especificada con los datos
   * proporcionados y devuelve un Observable de tipo `usuarioModel`.
   * @param {any} datos - El parámetro "datos" es de tipo "cualquiera" lo que significa que puede
   * aceptar cualquier tipo de dato. Se utiliza para pasar los datos del cliente a registrar.
   * @returns un Observable de tipo `usuarioModel`.
   */
  RegistroClienteLogica(datos: any): Observable<usuarioModel> {
    console.log(datos);
    return this.http.post<usuarioModel>(
      `${this.urlLogica}cliente-publico`,
      datos
    );
  }

  /**
   * La función `ValidarHashUsuarioPublico` toma una cadena hash como entrada y envía una solicitud
   * POST a una URL específica para validar el hash.
   * @param {string} hash - Una cadena que representa el código hash de un usuario.
   * @returns un Observable de tipo booleano.
   */
  ValidarHashUsuarioPublico(hash: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.urlBase}validar-hash-usuario`, {
      codigoHash: hash,
    });
  }

  /**
   * La función "obtenerCorreo" recupera la dirección de correo electrónico a partir de los datos de
   * sesión del usuario almacenados en el almacenamiento local.
   * @returns una cadena, que es la dirección de correo electrónico almacenada en el elemento
   * 'datos-sesion' en localStorage. Si el elemento 'datos-sesion' existe y contiene una dirección de
   * correo electrónico válida, se devolverá esa dirección de correo electrónico. De lo contrario, se
   * devolverá una cadena vacía.
   */
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
  /**
   * La función "obtenerIdUsuario" recupera el ID de usuario del almacenamiento local si existe, de lo
   * contrario devuelve una cadena vacía.
   * @returns la identificación del usuario si existe en el almacenamiento local; de lo contrario,
   * devuelve una cadena vacía.
   */
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
  /**
   * La función "obtenerNombreCompleto" recupera el nombre completo de un usuario del almacenamiento
   * local y lo devuelve como una cadena.
   * @returns un valor de cadena, que es el nombre completo del usuario.
   */
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

  //TODO: falta verifiar si esto funciona, debe retornar el id de la logica para lograr hacer la solicitud de un servicio
  buscarIdUsuarioPorCorreo(correo: string) {
    return this.http.get(`${this.urlLogica}cliente?correo=${correo}`);
  }

  /**
   * La función "Registrarse" recupera el correo electrónico del usuario del almacenamiento local, busca
   * el ID de usuario correspondiente y luego utiliza ese ID para solicitar un viaje.
   */
  Registrarse() {
    let correo = localStorage.getItem('datos-sesion');
    if (correo) {
      this.buscarIdUsuarioPorCorreo(correo).subscribe((usuario: any) => {
        let idUsuario = usuario.id;
        // Aquí puedes usar idUsuario para solicitar un viaje
        alert(' el id del usuario en logica es: ' + idUsuario);
      });
    }
  }

  /**
   * La función "obtenerFoto" recupera la foto del usuario del almacenamiento local si existe, en caso
   * contrario devuelve una cadena vacía.
   * @returns una cadena, que es el valor de la variable "foto".
   */
  obtenerFoto(): string {
    let datosSesion = localStorage.getItem('datos-sesion');

    if (datosSesion) {
      let ds = JSON.parse(datosSesion);
      let foto = ds.user.Foto;
      console.log(foto);
      return foto;
    }
    return '';
  }

  /**
   * La función "obtenerRol" recupera el rol de un usuario del almacenamiento local y lo devuelve como
   * una cadena.
   * @returns una cadena que representa el rol del usuario.
   */
  obtenerRol(): string {
    let datosSesion = localStorage.getItem('datos-sesion');

    if (datosSesion) {
      let ds = JSON.parse(datosSesion);
      let idrol = ds.user.rolId;

      let rol = '';

      if (idrol == configRoles.idrolAdmin) {
        rol = 'Administrador';
      }
      if (idrol == configRoles.idrolConductor) {
        rol = 'Conductor';
      }
      if (idrol == configRoles.idCliente) {
        rol = 'Cliente';
      }

      return rol;
    }
    return '';
  }

  //TODO: esto no funciona
  updateImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.urlLogica}cargar-archivo-cliente`, formData);
  }

  /**
   * La función envía un mensaje con información de contacto y contenido del mensaje a una URL
   * específica.
   * @param {string} nombreCompleto - El nombre completo de la persona que envía el mensaje.
   * @param {string} correo - El parámetro "correo" representa la dirección de correo electrónico de la
   * persona que envía el mensaje.
   * @param {string} celular - El parámetro "celular" es una cadena que representa el número de
   * teléfono de la persona que envía el mensaje.
   * @param {string} tipoMensaje - El parámetro "tipoMensaje" es una cadena que representa el tipo de
   * mensaje que se envía. Podría ser algo así como "Consulta", "Sugerencia" (sugerencia), "Reclamo"
   * (queja), etc.
   * @param {string} mensaje - El parámetro "mensaje" es una cadena que representa el contenido del
   * mensaje que se enviará.
   * @returns un Observable de tipo "formulario".
   */
  EnviarMensaje(
    nombreCompleto: string,
    correo: string,
    celular: string,
    tipoMensaje: string,
    mensaje: string
  ): Observable<formulario> {
    return this.http.post<formulario>(
      `${this.urlBase}enviar-mensaje-formulario-contacto`,
      {
        nombreCompleto: nombreCompleto,
        correo: correo,
        celular: celular,
        tipoMensaje: tipoMensaje,
        mensaje: mensaje,
      }
    );
  }
}
