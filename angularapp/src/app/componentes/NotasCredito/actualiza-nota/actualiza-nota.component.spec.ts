import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaNotaComponent } from './actualiza-nota.component';

describe('ActualizaNotaComponent', () => {
    let component: ActualizaNotaComponent;
    let fixture: ComponentFixture<ActualizaNotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [ActualizaNotaComponent]
    });
      fixture = TestBed.createComponent(ActualizaNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
