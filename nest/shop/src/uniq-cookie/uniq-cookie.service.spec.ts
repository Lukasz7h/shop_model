import { Test, TestingModule } from '@nestjs/testing';
import { UniqCookieService } from './uniq-cookie.service';

describe('UniqCookieService', () => {
  let service: UniqCookieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniqCookieService],
    }).compile();

    service = module.get<UniqCookieService>(UniqCookieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
