import { Test, TestingModule } from '@nestjs/testing';
import { ActivityAttributeController } from './activity-attribute.controller';

describe('ActivityAttributesController', () => {
  let controller: ActivityAttributeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityAttributeController],
    }).compile();

    controller = module.get<ActivityAttributeController>(ActivityAttributeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
