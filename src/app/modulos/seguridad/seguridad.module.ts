import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { IdentificacionTwofaComponent } from './identificacion-twofa/identificacion-twofa.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { EliminarUsuarioComponent } from './usuario/eliminar-usuario/eliminar-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { RegistroPublicoUsuariosComponent } from './registro-publico-usuarios/registro-publico-usuarios.component';
import { ValidarHashUsuarioPublicoComponent } from './validar-hash-usuario-publico/validar-hash-usuario-publico.component';
import { RegistroPublicoConductoresComponent } from './registro-publico-conductores/registro-publico-conductores.component';
import { FormularioContactoComponent } from './formulario-contacto/formulario-contacto.component';
import { InformacionComponent } from './informacion/informacion.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { VistaClienteComponent } from './vista-cliente/vista-cliente.component';
import { AceptarTerminosComponent } from './aceptar-terminos/aceptar-terminos.component';
import { CambiarclaveComponent } from './cambiarclave/cambiarclave.component';
import { VistaConductorComponent } from './vista-conductor/vista-conductor.component';
import { UbicacionConductorComponent } from './ubicacion-conductor/ubicacion-conductor.component';
import { VistaAdministradorComponent } from './vista-administrador/vista-administrador.component';
import {  NgChartsModule } from 'ng2-charts';
import { VistaEsperaComponent } from './vista-espera/vista-espera.component';
import { SolicitudesDeServicioComponent } from './solicitudes-de-servicio/solicitudes-de-servicio.component';




@NgModule({
  declarations: [
    IdentificacionUsuarioComponent,
    IdentificacionTwofaComponent,
    RecuperarClaveComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    ListarUsuarioComponent,
    EliminarUsuarioComponent,
    CerrarSesionComponent,
    RegistroPublicoUsuariosComponent,
    ValidarHashUsuarioPublicoComponent,
    RegistroPublicoConductoresComponent,
    FormularioContactoComponent,
    InformacionComponent,
    VistaClienteComponent,
    AceptarTerminosComponent,
    CambiarclaveComponent,
    VistaConductorComponent,
    UbicacionConductorComponent,
    VistaAdministradorComponent,
    VistaEsperaComponent,
    SolicitudesDeServicioComponent,
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    ReactiveFormsModule, 
    RecaptchaModule,
    NgChartsModule,
    ReactiveFormsModule,
    
  ]
})
export class SeguridadModule { }
