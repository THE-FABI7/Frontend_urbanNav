import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as M from 'materialize-css';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ubicacion-conductor',
  templateUrl: './ubicacion-conductor.component.html',
  styleUrls: ['./ubicacion-conductor.component.css'],
})
export class UbicacionConductorComponent {
  [x: string]: any;
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private elementRef: ElementRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.construirFormulario();
  }

  ngAfterViewInit() {
    M.FormSelect.init(
      this.elementRef.nativeElement.querySelectorAll('select'),
      {}
    );
  }

  construirFormulario() {
    this.fGroup = this.fb.group({
      estado: ['', Validators.required],
      ubicacion: ['', Validators.required],
    });
  }

  Actualizar() {
    // obtenermos los datos los cuales se van a actualizar
    let idUbicacion = this.obtenerFormGroup['ubicacion'].value;
    let estado = this.obtenerFormGroup['estado'].value;
    // obtenemos el id del usuario
    let Correo = this.servicioSeguridad.obtenerCorreo();

    let datos = {
      idUbicacion,
      Correo,
      estado,
    };

    try {
      this.servicioSeguridad.actualizarUbicacionConductor(datos).subscribe({
        next: (respuesta: any) => {
           alert('Se ha actualizado su ubicacion correctamente');
           this.router.navigate(['/seguridad/solicitudes-servicio']); // Navega a la pagina de asignacion de servicios
        },
        error: (error) => {
          alert('Error al actualizar:');
          console.log(error)
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}
