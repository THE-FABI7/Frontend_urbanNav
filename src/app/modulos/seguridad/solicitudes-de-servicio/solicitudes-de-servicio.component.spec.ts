import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesDeServicioComponent } from './solicitudes-de-servicio.component';

describe('SolicitudesDeServicioComponent', () => {
  let component: SolicitudesDeServicioComponent;
  let fixture: ComponentFixture<SolicitudesDeServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudesDeServicioComponent]
    });
    fixture = TestBed.createComponent(SolicitudesDeServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
