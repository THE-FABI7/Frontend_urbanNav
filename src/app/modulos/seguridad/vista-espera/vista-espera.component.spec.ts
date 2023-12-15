import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaEsperaComponent } from './vista-espera.component';

describe('VistaEsperaComponent', () => {
  let component: VistaEsperaComponent;
  let fixture: ComponentFixture<VistaEsperaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaEsperaComponent]
    });
    fixture = TestBed.createComponent(VistaEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
