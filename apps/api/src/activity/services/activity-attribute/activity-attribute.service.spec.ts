import { Test, TestingModule } from '@nestjs/testing';
import { ActivityAttributeService } from './activity-attribute.service';

describe('ActivityAttributeService', () => {
  let service: ActivityAttributeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityAttributeService],
    }).compile();

    service = module.get<ActivityAttributeService>(ActivityAttributeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
