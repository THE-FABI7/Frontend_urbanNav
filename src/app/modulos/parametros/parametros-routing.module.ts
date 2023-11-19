import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearAutomovilComponent } from './automovil/crear-automovil/crear-automovil.component';
import { EditarAutomovilComponent } from './automovil/editar-automovil/editar-automovil.component';
import { CrearComentarioComponent } from './comentario/crear-comentario/crear-comentario.component';
import { ListarComentarioComponent } from './comentario/listar-comentario/listar-comentario.component';

const routes: Routes = [
{
  path: 'crear-automovil',
  component: CrearAutomovilComponent
},
{
  path: 'editar-Automovil',
  component: EditarAutomovilComponent
},
{
  path: 'editar-Automovil/:id',
  component: EditarAutomovilComponent
},
{
  path: 'crear-comentario',
  component: CrearComentarioComponent   
},
{
  path: 'listar-comentarios',
  component: ListarComentarioComponent
}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
