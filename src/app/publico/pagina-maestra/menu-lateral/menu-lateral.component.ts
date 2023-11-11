import { Component, ElementRef, ViewChild } from '@angular/core';
import { itemMenuModel } from 'src/app/model/item.menu.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

declare const iniciarMenuLateral: any;
declare const M: any;

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css'],
})
export class MenuLateralComponent {
  listaMenus: itemMenuModel[] = [];
  nombre: string = '';
  correo: string = '';
  foto: string = '';
  userImage = 'https://img.favpng.com/22/0/21/computer-icons-user-profile-clip-art-png-favpng-MhMHJ0Fw21MJadYjpvDQbzu5S.jpg';
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private servicioSeguridad: SeguridadService) {}

  ngOnInit() {
    this.listaMenus = this.servicioSeguridad.ObtenerItemsMenuLateral();
    this.nombre = this.servicioSeguridad.obtenerNombreCompleto();
    this.correo = this.servicioSeguridad.obtenerCorreo();
    const imageUrl = this.servicioSeguridad.obtenerFoto();
    if (imageUrl) {
      this.userImage = imageUrl;
    }
    iniciarMenuLateral();
    this.updateUserImage(new Event('dummy')) 
  }

  ngAfterViewInit() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    var collapsibles = document.querySelectorAll('.collapsible')
    for (var i = 0; i < collapsibles.length; i++) {
      M.Collapsible.init(collapsibles[i]);
    }

  }

  updateUserImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.servicioSeguridad.updateImage(file).subscribe((response: any) => {
        if (response.file) {
          this.userImage = `${this.servicioSeguridad.urlLogica}${response.file}`;
        }
      });
    }
  }
 
}


