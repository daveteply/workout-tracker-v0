import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutSetController } from './workout-set.controller';

describe('WorkoutSetController', () => {
  let controller: WorkoutSetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutSetController],
    }).compile();

    controller = module.get<WorkoutSetController>(WorkoutSetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
