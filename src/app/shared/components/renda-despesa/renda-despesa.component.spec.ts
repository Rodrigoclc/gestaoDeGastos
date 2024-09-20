import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendaDespesaComponent } from './renda-despesa.component';

describe('RendaDespesaComponent', () => {
  let component: RendaDespesaComponent;
  let fixture: ComponentFixture<RendaDespesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendaDespesaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RendaDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
