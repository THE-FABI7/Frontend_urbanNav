import { Component } from '@angular/core';
import { ComentarioModel } from 'src/app/model/comentario.model';
import { ParametrosService } from 'src/app/servicios/parametros.service';

@Component({
  selector: 'app-listar-comentario',
  templateUrl: './listar-comentario.component.html',
  styleUrls: ['./listar-comentario.component.css'],
})
export class ListarComentarioComponent {
  lisarComentarios: ComentarioModel[] = [];

  constructor(private parametrosServicio: ParametrosService) {}

  ngOnInit(){
     this.parametrosServicio.listarRegistros().subscribe({
      next: (comentarios) => {
        this.lisarComentarios = comentarios;
      },
      error: (error) => {
        console.log(error);
      },
     })
  }
}
