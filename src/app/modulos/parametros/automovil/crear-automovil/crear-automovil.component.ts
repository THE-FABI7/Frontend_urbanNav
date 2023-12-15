import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutomovilModel } from 'src/app/model/automovil.model';
import { usuarioModel } from 'src/app/model/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-crear-automovil',
  templateUrl: './crear-automovil.component.html',
  styleUrls: ['./crear-automovil.component.css']
})
export class CrearAutomovilComponent {
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
      marca: ['', [Validators.required, Validators.minLength(10)]],
      modelo: ['', [Validators.required, Validators.minLength(10)]],
      placa: ['', [Validators.minLength(6), Validators.required]],
      fecha: ['', [Validators.required, Validators.minLength(10)]],
      Soat: ['', [Validators.required, Validators.minLength(10)]],
      foto: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  async registrarse() {
    if (this.fGroup.invalid) {
      alert('Se deben llenar todos los campos');
    }

    let campos = this.ObtenerFormGroup;

    let correo = this.servicioSeguridad.obtenerCorreo();


    let datosLogica = {
      Marca: campos['marca'].value,
      Modelo: campos['modelo'].value,
      Placa: campos['placa'].value,
      FechaDelAutomovil: campos['fecha'].value,
      Soat: campos['Soat'].value,
      conductorId: await this.servicioSeguridad.findByIdConductor(correo)
    };

    console.log(datosLogica);

    this.servicioSeguridad.RegistroAutomovilLogica(datosLogica).subscribe({
      next: (respuesta: AutomovilModel) => { 
        alert(
          'Registro correctamente'
        );
      },
      error: (err) => {
        console.log(err);
      },
    },
    
    );
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }

}
