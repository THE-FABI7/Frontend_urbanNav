import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as L from 'leaflet';
import { AfterViewInit, ElementRef } from '@angular/core';
import * as M from 'materialize-css';
import io from 'socket.io-client';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vista-cliente',
  templateUrl: './vista-cliente.component.html',
  styleUrls: ['./vista-cliente.component.css'],
})
/// <reference types="@types/googlemaps" />
export class VistaClienteComponent {
  fGroup: FormGroup = new FormGroup({});
  map: L.Map | undefined;
  private socket: any;

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private elementRef: ElementRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.construirFormulario();
    this.socket = io('http://localhost:3010');
  }
  ngAfterViewInit() {
    this.initMap();
    M.FormSelect.init(this.elementRef.nativeElement.querySelectorAll('select'), {});
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

    
      // Solicitar viaje 
      let idViaje = await this.servicioSeguridad.solicitarViaje(datos);
    // let nodeInfo = await this.servicioSeguridad.obtenerInformacionNodos();
      if (idViaje) {
        this.sendMessage(datos.Origen, datos.Destino, correo, idViaje);
        console.log(datos);
       //console.log("node info: " + nodeInfo);
      } else {
        console.error('Error al solicitar el viaje. El idViaje es undefined.');
      }

    } catch (error) {
      console.error('Error al solicitar servicio:', error);
    }
    this.router.navigate(['seguridad/vista-espera']);
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }

  async sendMessage(origen: string, destino: string, usuario: string, idViaje: number) {
    //let conductores: any[] = [];
  
     const message = origen + ' - ' + destino;
     let conductores = await this.servicioSeguridad.buscarConductoresCercanos(origen);
 
       console.log(conductores);
       console.log(message);
 
     const data = {
       user: usuario,
       message: message,
       recipient: conductores,
       messageId: idViaje
     };
 
     this.socket.emit("closerDriversMessage", data);
     console.log('enviado');
   }
}
