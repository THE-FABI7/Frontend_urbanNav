import { Component } from '@angular/core';
import { viaje } from 'src/app/model/viaje.model';
import { ParametrosService } from 'src/app/servicios/parametros.service';

@Component({
  selector: 'app-listar-viajes',
  templateUrl: './listar-viajes.component.html',
  styleUrls: ['./listar-viajes.component.css'],
})
export class ListarViajesComponent {
  viajes: viaje[] = [];

  constructor(private parametrosServicio: ParametrosService) {}

  ngOnInit() {
    this.parametrosServicio.listarViajes().subscribe({
      next: (viajes) => {
        this.viajes = viajes;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
