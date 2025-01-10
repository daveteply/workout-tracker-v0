import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientActivityService } from './prisma-client-activity.service';

describe('PrismaClientActivityService', () => {
  let service: PrismaClientActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaClientActivityService],
    }).compile();

    service = module.get<PrismaClientActivityService>(PrismaClientActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
