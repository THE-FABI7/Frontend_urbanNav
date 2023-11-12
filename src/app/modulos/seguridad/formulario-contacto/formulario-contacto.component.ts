import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formulario } from 'src/app/model/pqrs-model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-formulario-contacto',
  templateUrl: './formulario-contacto.component.html',
  styleUrls: ['./formulario-contacto.component.css'],
})
export class FormularioContactoComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) {}

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      nombreCompleto: ['', [Validators.required]],
      mensaje: ['', [Validators.required]],
      tipoMensaje: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required]],
    });
  }

  EnviarMensaje() {
    if (this.fGroup.invalid) {
      alert('Datos incompletos');
      console.log(this.fGroup);
    } else {
      let nombreCompleto = this.obtenerFormGroup['nombreCompleto'].value;
      let correo = this.obtenerFormGroup['correo'].value;
      let celular = this.obtenerFormGroup['celular'].value;
      let tipoMensaje = this.obtenerFormGroup['tipoMensaje'].value;
      let mensaje = this.obtenerFormGroup['mensaje'].value;

      this.servicioSeguridad
        .EnviarMensaje(nombreCompleto, correo, celular, tipoMensaje, mensaje)
        .subscribe({
          next: (data: formulario) => {
            console.log(data);
            alert('Mensaje enviado');
          },
          error: (error: Error) => {
            console.log(error);
          },
        });
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}
