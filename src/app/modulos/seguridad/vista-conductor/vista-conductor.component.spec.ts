import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaConductorComponent } from './vista-conductor.component';

describe('VistaConductorComponent', () => {
  let component: VistaConductorComponent;
  let fixture: ComponentFixture<VistaConductorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaConductorComponent]
    });
    fixture = TestBed.createComponent(VistaConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
