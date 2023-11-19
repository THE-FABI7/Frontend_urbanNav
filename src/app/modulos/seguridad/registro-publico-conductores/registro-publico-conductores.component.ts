import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { conductorModel } from 'src/app/model/conductor.model';
import { usuarioModel } from 'src/app/model/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-registro-publico-conductores',
  templateUrl: './registro-publico-conductores.component.html',
  styleUrls: ['./registro-publico-conductores.component.css'],
})
export class RegistroPublicoConductoresComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) {}
  ngOnInit() {
    this.construirFormulario();
  }

  construirFormulario() {
    this.fGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      sobrename: ['', [Validators.required, Validators.minLength(10)]],
      phoneNumber: ['', [Validators.minLength(10), Validators.required]],
      emailAddress: ['', [Validators.required]],
      birthdate: ['', [Validators.required, Validators.minLength(10)]],
      // password: ['', [Validators.required, Validators.minLength(5)]],
      vigencia: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  registrarse() {
    if (this.fGroup.invalid) {
      alert('Se deben llenar todos los campos');
    }

    try {
      let campos = this.ObtenerFormGroup;
      let datos = {
        Nombre: campos['name'].value,
        Apellido: campos['sobrename'].value,
        Telefono: campos['phoneNumber'].value,
        correo: campos['emailAddress'].value,
        FechaNacimiento: campos['birthdate'].value,
        // Fechavigencia: campos['vigencia'].value
        // password: campos['password'].value,
      };

      // let campos = this.ObtenerFormGroup;
      let datosLogica = {
        Nombre: campos['name'].value,
        Apellido: campos['sobrename'].value,
        Telefono: campos['phoneNumber'].value,
        Correo: campos['emailAddress'].value,
        FechaDeNacimiento: campos['birthdate'].value,
        Vigencia: campos['vigencia'].value,
        // password: camposLogica['password'].value,
      };

      this.servicioSeguridad.RegistrarConductor(datos).subscribe({
        next: (respuesta: usuarioModel) => {
          console.log(
            'Registro correctamente, se ha enviado un mensaje para validar el correo'
          );

          this.servicioSeguridad
            .RegistrarConductorLogica(datosLogica)
            .subscribe({
              next: (respuesta: conductorModel) => {
                console.log('Logica ok');
                this.router.navigate(['/seguridad/aceptar-terminos']); // Navega a aceptarTerminos
              },
              error: (err) => {
                console.log(err);
              },
            });
        },
        error: (err) => {
          console.log(err);
        },
      });
    } catch (error) {
      console.log(error);
      alert('algo salio Mal');
    }
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }
}
