import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';


@NgModule({
  declarations: [
    CrearClienteComponent,
    ListarClienteComponent,
    EditarClienteComponent,
    EliminarClienteComponent
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule
  ]
})
export class ParametrosModule { }
