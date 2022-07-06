import { Test, TestingModule } from '@nestjs/testing';
import { UniqCookieController } from './uniq-cookie.controller';

describe('UniqCookieController', () => {
  let controller: UniqCookieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniqCookieController],
    }).compile();

    controller = module.get<UniqCookieController>(UniqCookieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
