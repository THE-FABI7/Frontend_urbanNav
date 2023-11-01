import { permisosModel } from "./permisos.model";
import { usuarioModel } from "./usuario.model";

export class usuarioValidadoModel {
    usuario?: usuarioModel;
    token?: string = "";
    menu: permisosModel[] = []
  }