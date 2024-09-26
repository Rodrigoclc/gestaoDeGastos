import { TestBed } from '@angular/core/testing';

import { ConfiguracoesIniciaisService } from './configuracoes-iniciais.service';

describe('ConfiguracoesIniciaisService', () => {
  let service: ConfiguracoesIniciaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracoesIniciaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
