import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMetodoPagoComponent } from './listar-metodo-pago.component';

describe('ListarMetodoPagoComponent', () => {
  let component: ListarMetodoPagoComponent;
  let fixture: ComponentFixture<ListarMetodoPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarMetodoPagoComponent]
    });
    fixture = TestBed.createComponent(ListarMetodoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
