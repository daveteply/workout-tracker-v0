import { Test, TestingModule } from '@nestjs/testing';
import { DataTransformsService } from './data-transforms.service';

describe('DataTransformsService', () => {
  let service: DataTransformsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataTransformsService],
    }).compile();

    service = module.get<DataTransformsService>(DataTransformsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
