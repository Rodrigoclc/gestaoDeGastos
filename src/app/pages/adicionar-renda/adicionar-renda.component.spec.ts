import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarRendaComponent } from './adicionar-renda.component';

describe('AdicionarRendaComponent', () => {
  let component: AdicionarRendaComponent;
  let fixture: ComponentFixture<AdicionarRendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarRendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarRendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
