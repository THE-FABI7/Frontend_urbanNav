import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { usuarioValidadoModel } from 'src/app/model/usuario.validado.model';
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

  ngOnInit() {
    let datos = this.servicioSeguidad.obtenerDatosUsuarioLS();

    if (datos != null) {
      this.userId = datos._id!;
      this.constuirFormulario();
    } else {
      this.router.navigate(['/seguridad/identificar-usuario']);
    }
  }

  validarCodigo2fa() {
    if (this.fGroup.invalid) {
      alert('Debe ingresar el codigo');
    } else {
      let codigo2fa = this.obtenerFormGroup['codigo'].value;
      this.servicioSeguidad.validarCodigo2FA(this.userId, codigo2fa).subscribe({
        next: (data: usuarioValidadoModel) => {
          console.log(data);
          if (
            data.token != null &&
            data.token != undefined &&
            data.token != ''
          ) {
            this.servicioSeguidad.ConstruirMenuLateral(data.menu);
            console.log(data.menu);
            this.servicioSeguidad.AlmacenarDatosUsuarioValidado(data);
            this.router.navigate(['seguridad/vista-cliente  ']);
          } else {
            alert('el codigo no es valido');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}
