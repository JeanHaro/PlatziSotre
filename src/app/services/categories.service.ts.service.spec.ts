import { TestBed } from '@angular/core/testing';

import { Categories.Service.TsService } from './categories.service.ts.service';

describe('Categories.Service.TsService', () => {
  let service: Categories.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Categories.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
