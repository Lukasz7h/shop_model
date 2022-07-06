import { TestBed } from '@angular/core/testing';

import { FlowsProductsService } from './flows-products.service';

describe('FlowsProductsService', () => {
  let service: FlowsProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowsProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
