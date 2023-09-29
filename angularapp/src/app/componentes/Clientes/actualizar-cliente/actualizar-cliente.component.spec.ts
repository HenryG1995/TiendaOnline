import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarClienteComponent } from './actualizar-cliente.component';

describe('ActualizarClienteComponent', () => {
  let component: ActualizarClienteComponent;
  let fixture: ComponentFixture<ActualizarClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarClienteComponent]
    });
    fixture = TestBed.createComponent(ActualizarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
