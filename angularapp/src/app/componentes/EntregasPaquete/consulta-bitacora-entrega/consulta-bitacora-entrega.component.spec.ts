import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaBitacoraEntregaComponent } from './consulta-bitacora-entrega.component';

describe('ConsultaBitacoraEntregaComponent', () => {
  let component: ConsultaBitacoraEntregaComponent;
  let fixture: ComponentFixture<ConsultaBitacoraEntregaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaBitacoraEntregaComponent]
    });
    fixture = TestBed.createComponent(ConsultaBitacoraEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
