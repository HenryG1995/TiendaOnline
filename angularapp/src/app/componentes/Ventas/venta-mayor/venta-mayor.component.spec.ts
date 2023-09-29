import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaMayorComponent } from './venta-mayor.component';

describe('VentaMayorComponent', () => {
  let component: VentaMayorComponent;
  let fixture: ComponentFixture<VentaMayorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentaMayorComponent]
    });
    fixture = TestBed.createComponent(VentaMayorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
