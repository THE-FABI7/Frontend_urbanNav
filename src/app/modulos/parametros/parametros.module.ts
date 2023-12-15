import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';
import { CrearAutomovilComponent } from './automovil/crear-automovil/crear-automovil.component';
import { ListarAutomovilComponent } from './automovil/listar-automovil/listar-automovil.component';
import { EditarAutomovilComponent } from './automovil/editar-automovil/editar-automovil.component';
import { EliminarAutomovilComponent } from './automovil/eliminar-automovil/eliminar-automovil.component';
import { CrearComentarioComponent } from './comentario/crear-comentario/crear-comentario.component';
import { ListarComentarioComponent } from './comentario/listar-comentario/listar-comentario.component';
import { ListarViajesComponent } from './viajes/listar-viajes/listar-viajes.component';
import { ListarPagosComponent } from './pagos/listar-pagos/listar-pagos.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearClienteComponent,
    ListarClienteComponent,
    EditarClienteComponent,
    EliminarClienteComponent,
    CrearAutomovilComponent,
    ListarAutomovilComponent,
    EditarAutomovilComponent,
    EliminarAutomovilComponent,
    CrearComentarioComponent,
    ListarComentarioComponent,
    ListarViajesComponent,
    ListarPagosComponent,
    
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ParametrosModule { }
