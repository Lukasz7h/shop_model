import { TestBed } from '@angular/core/testing';

import { CurrDataService } from './curr-data.service';

describe('CurrDataService', () => {
  let service: CurrDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
