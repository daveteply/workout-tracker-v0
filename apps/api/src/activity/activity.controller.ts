import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { activity } from '@prisma/client';
import { PrismaClientService } from 'src/services/prisma-client/prisma-client.service';
import { UtilsService } from 'src/services/utils/utils.service';

@Controller('activity')
export class ActivityController {
  constructor(
    private clientService: PrismaClientService,
    private utilsService: UtilsService,
  ) {}

  @Get(':cs')
  async getActivitiesByCategory(@Param('cs') categorySlug: string): Promise<activity[]> {
    const id = this.utilsService.getId(categorySlug);
    return await this.clientService.client.activity.findMany({
      where: { category_id: id },
    });
  }

  @Post()
  async createActivity(@Body() body: any): Promise<void> {
    const activityCategoryId = this.utilsService.getId(body.activityCategorySlug);
    await this.clientService.client.activity.create({
      data: { title: body.title, category_id: activityCategoryId },
    });
  }

  @Delete(':slug')
  async deleteActivity(@Param('slug') slug: string): Promise<void> {
    const id = this.utilsService.getId(slug);
    await this.clientService.client.activity.delete({
      where: { activity_id: id },
    });
  }
}
