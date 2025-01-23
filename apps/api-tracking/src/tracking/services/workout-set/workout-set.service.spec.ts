import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutSetService } from './workout-set.service';

describe('WorkoutSetService', () => {
  let service: WorkoutSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutSetService],
    }).compile();

    service = module.get<WorkoutSetService>(WorkoutSetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
