import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAutomovilComponent } from './eliminar-automovil.component';

describe('EliminarAutomovilComponent', () => {
  let component: EliminarAutomovilComponent;
  let fixture: ComponentFixture<EliminarAutomovilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarAutomovilComponent]
    });
    fixture = TestBed.createComponent(EliminarAutomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
