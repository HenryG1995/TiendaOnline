import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoEntregaComponent } from './ingreso-entrega.component';

describe('IngresoEntregaComponent', () => {
  let component: IngresoEntregaComponent;
  let fixture: ComponentFixture<IngresoEntregaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresoEntregaComponent]
    });
    fixture = TestBed.createComponent(IngresoEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
