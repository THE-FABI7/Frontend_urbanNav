import { Component } from '@angular/core';
import { usuarioValidadoModel } from 'src/app/model/usuario.validado.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css'],
})
export class EncabezadoComponent {
  constructor(private servicioSeguridad: SeguridadService) {}

  sesionActiva: boolean = false;

  ngOnInit() {
    this.ValidarSesion();
  }

  ValidarSesion() {
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (datos: usuarioValidadoModel) => {
        console.log(datos);
        if (datos.token != '') {
          this.sesionActiva = false;
        } else {
          this.sesionActiva = true;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
