import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-ubicacion-conductor',
  templateUrl: './ubicacion-conductor.component.html',
  styleUrls: ['./ubicacion-conductor.component.css'],
})
export class UbicacionConductorComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.construirFormulario();
  
  }

  ngAfterViewInit() {
    M.FormSelect.init(this.elementRef.nativeElement.querySelectorAll('select'), {});
  }


  construirFormulario() {
    this.fGroup = this.fb.group({
      estado: ['', Validators.required],
      ubicacion: ['', Validators.required]
    });
  }

  Actualizar() {
    // obtenermos los datos los cuales se van a actualizar
    let ubicacion = this.obtenerFormGroup['ubicacion'].value;
    let estado = this.obtenerFormGroup['estado'].value;
    // obtenemos el id del usuario
    let correo = this.servicioSeguridad.obtenerCorreo();

    this.servicioSeguridad
      .findByIdConductor(correo)
      .then((id) => {
        try {
          if (id) {
            this.servicioSeguridad.actualizarUbicacionEstadoConductor(
              id,
              ubicacion,
              estado
            );
          }
          console.log(id)
          alert('datos actualizados');
        } catch (error) {
          // Handle error
          console.log(error);
        }
      })
      .catch((error) => {
        // Handle error
      });
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}
