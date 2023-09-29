import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaMenorComponent } from './venta-menor.component';

describe('VentaMenorComponent', () => {
  let component: VentaMenorComponent;
  let fixture: ComponentFixture<VentaMenorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentaMenorComponent]
    });
    fixture = TestBed.createComponent(VentaMenorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
