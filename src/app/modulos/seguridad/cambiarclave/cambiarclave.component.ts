import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-cambiarclave',
  templateUrl: './cambiarclave.component.html',
  styleUrls: ['./cambiarclave.component.css'],
})
export class CambiarclaveComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) {}

  ngOnInit() {
    this.fGroup = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      claveActual: ['', [Validators.required]],
      claveNueva: ['', [Validators.required]],
    });
  }

  CambiarClave() {
    if (this.fGroup.invalid) {
      alert('Debe ingresar los datos del usuario');
    } else {
      let datos = {
        correo: this.obtenerFormGroup['correo'].value,
        claveActual: this.obtenerFormGroup['claveActual'].value,
        claveNueva: this.obtenerFormGroup['claveNueva'].value,
      };

      this.servicioSeguridad.CambiarClave(datos).subscribe({
        next: (datos: any) => {
          alert('Se ha cambiado la contraseña correctamente.');
        },
        error: (err) => {
          alert('Ha ocurrido un error cambiando la contraseña.');
          console.log(err)
        },
      });
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}
