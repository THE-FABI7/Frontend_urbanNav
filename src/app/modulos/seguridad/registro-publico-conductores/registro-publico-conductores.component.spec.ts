import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPublicoConductoresComponent } from './registro-publico-conductores.component';

describe('RegistroPublicoConductoresComponent', () => {
  let component: RegistroPublicoConductoresComponent;
  let fixture: ComponentFixture<RegistroPublicoConductoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPublicoConductoresComponent]
    });
    fixture = TestBed.createComponent(RegistroPublicoConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
