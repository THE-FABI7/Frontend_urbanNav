import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { IdentificacionTwofaComponent } from './identificacion-twofa/identificacion-twofa.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { RegistroPublicoUsuariosComponent } from './registro-publico-usuarios/registro-publico-usuarios.component';
import { ValidarHashUsuarioPublicoComponent } from './validar-hash-usuario-publico/validar-hash-usuario-publico.component';
import { RegistroPublicoConductoresComponent } from './registro-publico-conductores/registro-publico-conductores.component';
import { FormularioContactoComponent } from './formulario-contacto/formulario-contacto.component';
import { InformacionComponent } from './informacion/informacion.component';
import { VistaClienteComponent } from './vista-cliente/vista-cliente.component';
import { AceptarTerminosComponent } from './aceptar-terminos/aceptar-terminos.component';
import { CambiarclaveComponent } from './cambiarclave/cambiarclave.component';

const routes: Routes = [
  {
    path: 'identificar-usuario',
    component: IdentificacionUsuarioComponent,
  },
  {
    path: '2fa',
    component: IdentificacionTwofaComponent,
  },
  {
    path: 'listar-usuarios',
    component: ListarUsuarioComponent,
  },
  {
    path: 'editar-usuarios',
    component: EditarUsuarioComponent,
  },
  {
    path: 'cerrar-sesion',
    component: CerrarSesionComponent,
  },
  {
    path: 'recuperar-clave',
    component: RecuperarClaveComponent,
  },
  {
    path: 'registro-publico',
    component: RegistroPublicoUsuariosComponent,
  },
  {
    path: 'registrarConductor',
    component: RegistroPublicoConductoresComponent,
  },
  {
    path: 'validar-hash-usuario-publico/:hash',
    component: ValidarHashUsuarioPublicoComponent,
  },
  {
    path: 'registrarpqr',
    component: FormularioContactoComponent,
  },
  {
    path: 'informacion',
    component: InformacionComponent,
  },
  {
    path: 'vista-cliente',
    component: VistaClienteComponent,
  },
  {
    path: 'aceptar-terminos',
    component: AceptarTerminosComponent,
  },
  {
    path: 'cambiar-clave',
    component: CambiarclaveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguridadRoutingModule {}
