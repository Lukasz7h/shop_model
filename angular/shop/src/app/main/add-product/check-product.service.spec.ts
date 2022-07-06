import { TestBed } from '@angular/core/testing';

import { CheckProductService } from './check-product.service';

describe('CheckProductService', () => {
  let service: CheckProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
