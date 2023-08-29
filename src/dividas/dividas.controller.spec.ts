import { Test, TestingModule } from '@nestjs/testing';
import { DividasController } from './dividas.controller';
import { DividasService } from './dividas.service';

describe('DividasController', () => {
  let controller: DividasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DividasController],
      providers: [DividasService],
    }).compile();

    controller = module.get<DividasController>(DividasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
