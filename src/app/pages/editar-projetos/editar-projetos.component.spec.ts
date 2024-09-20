import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProjetosComponent } from './editar-projetos.component';

describe('EditarProjetosComponent', () => {
  let component: EditarProjetosComponent;
  let fixture: ComponentFixture<EditarProjetosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarProjetosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarProjetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
