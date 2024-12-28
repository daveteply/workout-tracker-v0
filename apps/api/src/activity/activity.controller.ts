import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { activity } from '@prisma/client';
import { PrismaClientService } from 'src/services/prisma-client/prisma-client.service';
import { UtilsService } from 'src/services/utils/utils.service';

@Controller('activity')
export class ActivityController {
  constructor(
    private clientService: PrismaClientService,
    private utilService: UtilsService,
  ) {}

  @Get(':slug')
  async getActivitiesByCategory(@Param('slug') slug: string): Promise<activity[]> {
    const id = this.utilService.getId(slug);
    return await this.clientService.client.activity.findMany({
      where: { category_id: id },
    });
  }

  @Post()
  async createActivity(@Body() body: any): Promise<void> {
    const activityCategoryId = this.utilService.getId(body.activityCategorySlug);
    await this.clientService.client.activity.create({
      data: { title: body.title, category_id: activityCategoryId },
    });
  }
}
