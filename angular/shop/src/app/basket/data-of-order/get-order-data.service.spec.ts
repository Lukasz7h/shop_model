import { TestBed } from '@angular/core/testing';

import { GetOrderDataService } from './get-order-data.service';

describe('GetOrderDataService', () => {
  let service: GetOrderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOrderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
