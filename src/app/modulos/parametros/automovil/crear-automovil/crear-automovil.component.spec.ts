import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAutomovilComponent } from './crear-automovil.component';

describe('CrearAutomovilComponent', () => {
  let component: CrearAutomovilComponent;
  let fixture: ComponentFixture<CrearAutomovilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearAutomovilComponent]
    });
    fixture = TestBed.createComponent(CrearAutomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
