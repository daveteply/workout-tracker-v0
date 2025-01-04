import { Test, TestingModule } from '@nestjs/testing';
import { ActivityAttributesController } from './activity-attributes.controller';

describe('ActivityAttributesController', () => {
  let controller: ActivityAttributesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityAttributesController],
    }).compile();

    controller = module.get<ActivityAttributesController>(ActivityAttributesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
