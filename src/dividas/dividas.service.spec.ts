import { Test, TestingModule } from '@nestjs/testing';
import { DividasService } from './dividas.service';

describe('DividasService', () => {
  let service: DividasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DividasService],
    }).compile();

    service = module.get<DividasService>(DividasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
