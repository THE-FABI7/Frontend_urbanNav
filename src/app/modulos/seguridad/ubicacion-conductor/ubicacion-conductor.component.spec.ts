import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionConductorComponent } from './ubicacion-conductor.component';

describe('UbicacionConductorComponent', () => {
  let component: UbicacionConductorComponent;
  let fixture: ComponentFixture<UbicacionConductorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UbicacionConductorComponent]
    });
    fixture = TestBed.createComponent(UbicacionConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
