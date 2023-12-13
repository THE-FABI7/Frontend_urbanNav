import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-vista-cliente',
  templateUrl: './vista-cliente.component.html',
  styleUrls: ['./vista-cliente.component.css'],
})
/// <reference types="@types/googlemaps" />
export class VistaClienteComponent {
  fGroup: FormGroup = new FormGroup({});
  map: L.Map | undefined;

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) {}

  ngOnInit() {
    this.construirFormulario();
  }
  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(this.map);

        L.marker([latitude, longitude])
          .addTo(this.map)
          .bindPopup('Your Location')
          .openPopup();

        // Manejar el evento de redimensionamiento
        this.map.on('resize', () => {
          this.map!.invalidateSize();
        });
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  construirFormulario() {
    this.fGroup = this.fb.group({
      origen: ['', [Validators.minLength(10), Validators.required]],
      destino: ['', [Validators.minLength(10), Validators.required]],
    });
  }

  async solicitarServicio() {
    try {
      let correo = this.servicioSeguridad.obtenerCorreo();
      let clienteId = await this.servicioSeguridad.findByIdCliente(correo);
      console.log(clienteId);
      let datos = {
        Origen: this.fGroup.controls['origen'].value,
        Destino: this.fGroup.controls['destino'].value,
        clienteId
        
      };

      console.log(datos)    
    
      //solicitar viaje 
      this.servicioSeguridad.solicitarViaje(datos).subscribe({
        next: (respuesta: any) => {
           alert('Se ha solicitado el viaje correctamente');
        },
        error: (error) => {
          alert('Error al solicitar viaje:');
          console.log(error)
        },
      });


    } catch (error) {
      console.error('Error al solicitar servicio:', error);
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}
