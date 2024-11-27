import { Controller, Get } from '@nestjs/common';
import { activity_category } from '@prisma/client';
import { PrismaClientService } from 'src/services/prisma-client/prisma-client.service';
import { UtilsService } from 'src/services/utils/utils.service';

@Controller('activity-category')
export class ActivityCategoryController {
  constructor(
    private clientService: PrismaClientService,
    private utilService: UtilsService,
  ) {}

  @Get()
  async getActivityCategories(): Promise<activity_category[]> {
    const activityCategories =
      await this.clientService.client.activity_category.findMany();

    return activityCategories;
  }
}
