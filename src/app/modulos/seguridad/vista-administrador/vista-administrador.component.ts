import { Component } from '@angular/core';
import { viaje } from 'src/app/model/viaje.model';
import { ParametrosService } from 'src/app/servicios/parametros.service';

@Component({
  selector: 'app-vista-administrador',
  templateUrl: './vista-administrador.component.html',
  styleUrls: ['./vista-administrador.component.css'],
})
export class VistaAdministradorComponent {
  viajes: viaje[] = [];

  constructor(private parametrosServicio: ParametrosService) {}

  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  barChartLabels: string[] = []; // Aquí puedes poner las fechas, por ejemplo
  barChartType: string = 'bar';
  barChartLegend: boolean = true;

  barChartData: any[] = [{ data: [], label: 'Número de Viajes' }];

  ngOnInit() {
    this.parametrosServicio.listarViajes().subscribe({
      next: (viajes) => {
        this.viajes = viajes;
        this.procesarDatosParaGrafico();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  procesarDatosParaGrafico() {
    const viajesPorFecha = this.viajes.reduce((contador, viaje) => {
      if (viaje.Fecha) {
        const fecha = new Date(viaje.Fecha);
        const fechaSinHora = new Date(
          fecha.getFullYear(),
          fecha.getMonth(),
          fecha.getDate()
        ).toISOString();

        return contador.set(
          fechaSinHora,
          (contador.get(fechaSinHora) || 0) + 1
        );
      }
      return contador;
    }, new Map<string, number>());

    this.barChartLabels = Array.from(viajesPorFecha.keys());
    this.barChartData[0].data = Array.from(viajesPorFecha.values());
  }
}
