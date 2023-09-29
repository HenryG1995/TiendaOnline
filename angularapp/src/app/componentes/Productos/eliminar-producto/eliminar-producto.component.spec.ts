import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarProductoComponent } from './eliminar-producto.component';

describe('EliminarProductoComponent', () => {
  let component: EliminarProductoComponent;
  let fixture: ComponentFixture<EliminarProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarProductoComponent]
    });
    fixture = TestBed.createComponent(EliminarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
