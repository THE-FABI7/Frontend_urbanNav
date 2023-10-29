import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { IdentificacionTwofaComponent } from './identificacion-twofa/identificacion-twofa.component';

const routes: Routes = [
  {
    path: 'identificar-usuario',
    component: IdentificacionUsuarioComponent
  },
  {
    path: '2fa',
    component: IdentificacionTwofaComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
