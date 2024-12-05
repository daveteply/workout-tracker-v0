import { Body, Controller, Get, Post } from '@nestjs/common';
import { activity_category } from '@prisma/client';
import { PrismaClientService } from 'src/services/prisma-client/prisma-client.service';

@Controller('activity-category')
export class ActivityCategoryController {
  constructor(private clientService: PrismaClientService) {}

  @Get()
  async getActivityCategories(): Promise<activity_category[]> {
    const activityCategories =
      await this.clientService.client.activity_category.findMany();

    return activityCategories;
  }

  @Post()
  async createActivityCategory(@Body() body: any): Promise<void> {
    const activityCagetory =
      await this.clientService.client.activity_category.create({
        data: { title: body.title },
      });
  }
}
