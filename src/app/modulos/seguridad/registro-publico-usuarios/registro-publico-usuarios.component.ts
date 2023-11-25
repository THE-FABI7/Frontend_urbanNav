import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usuarioModel } from 'src/app/model/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-registro-publico-usuarios',
  templateUrl: './registro-publico-usuarios.component.html',
  styleUrls: ['./registro-publico-usuarios.component.css'],
})
export class RegistroPublicoUsuariosComponent {
  fGroup: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
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
      NumEmergencia: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  registrarse() {
    if (this.fGroup.invalid) {
      alert('Se deben llenar todos los campos');
    }

    let campos = this.ObtenerFormGroup;
    let datos = {
      Nombre: campos['name'].value,
      Apellido: campos['sobrename'].value,
      Telefono: campos['phoneNumber'].value,
      correo: campos['emailAddress'].value,
      FechaNacimiento: campos['birthdate'].value
      // password: campos['password'].value,
    };

    let datosLogica = {
      Nombre: campos['name'].value,
      Apellido: campos['sobrename'].value,
      Telefono: campos['phoneNumber'].value,
      Correo: campos['emailAddress'].value,
      FechaDeNacimiento: campos['birthdate'].value,
      NumEmergencia: campos['NumEmergencia'].value

    }

    this.servicioSeguridad.RegistrarUsuarioPublico(datos).subscribe({
      next: (respuesta: usuarioModel) => {
        alert(
          'Registro correctamente, se ha enviado un mensaje para validar el correo'
        );
        this.servicioSeguridad.RegistroClienteLogica(datosLogica).subscribe({
          next: (respuesta: usuarioModel) => {
            console.log(
              'Registro correctamente, se ha enviado un mensaje para validar el correo'
            );
          },
          error: (err) => {
            console.log(err);
          },

        }
        
        )
      },
      error: (err) => {
        console.log(err);
      },
      
    });
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }
}
