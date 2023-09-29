import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarClienteComponent } from './eliminar-cliente.component';

describe('EliminarClienteComponent', () => {
  let component: EliminarClienteComponent;
  let fixture: ComponentFixture<EliminarClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarClienteComponent]
    });
    fixture = TestBed.createComponent(EliminarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
