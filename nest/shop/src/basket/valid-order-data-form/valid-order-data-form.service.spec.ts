import { Test, TestingModule } from '@nestjs/testing';
import { ValidOrderDataFormService } from './valid-order-data-form.service';

describe('ValidOrderDataFormService', () => {
  let service: ValidOrderDataFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidOrderDataFormService],
    }).compile();

    service = module.get<ValidOrderDataFormService>(ValidOrderDataFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
