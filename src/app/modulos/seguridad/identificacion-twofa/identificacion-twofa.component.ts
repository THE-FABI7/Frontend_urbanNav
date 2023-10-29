import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-identificacion-twofa',
  templateUrl: './identificacion-twofa.component.html',
  styleUrls: ['./identificacion-twofa.component.css'],
})
export class IdentificacionTwofaComponent {
  userId: string = '';
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private servicioSeguidad: SeguridadService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  constuirFormulario() {
    this.fGroup = this.fb.group({
      codigo: ['', [Validators.required]],
    });
  }

  validarCodigo2fa() {
    let datos = this.servicioSeguidad.obtenerDatosUsuarioLS();

    if (datos != null) {
      this.userId = datos._id!;
      this.constuirFormulario();
    }else{
      this.router.navigate(['/seguridad/identificar-usuario'])
    }
  }
}
