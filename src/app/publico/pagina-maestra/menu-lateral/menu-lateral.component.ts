import { Component } from '@angular/core';
import { itemMenuModel } from 'src/app/model/item.menu.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

declare const iniciarMenuLateral: any;

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css'],
})
export class MenuLateralComponent {
  listaMenus: itemMenuModel[] = [];
  nombre: string = '';
  correo: string = '';

  constructor(private servicioSeguridad: SeguridadService) {}

  ngOnInit() {
    this.listaMenus = this.servicioSeguridad.ObtenerItemsMenuLateral();
    this.nombre = this.servicioSeguridad.obtenerNombreCompleto();
    this.correo = this.servicioSeguridad.obtenerCorreo();
    iniciarMenuLateral();
  }
}


