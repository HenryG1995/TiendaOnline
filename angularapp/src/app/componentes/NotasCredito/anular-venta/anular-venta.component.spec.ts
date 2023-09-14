import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularVentaComponent } from './anular-venta.component';

describe('AnularVentaComponent', () => {
  let component: AnularVentaComponent;
  let fixture: ComponentFixture<AnularVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnularVentaComponent]
    });
    fixture = TestBed.createComponent(AnularVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
