import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Patch(':slug')
  async updateActivityCategory(@Param('slug') slug: string, @Body() body: any): Promise<void> {
    const id = this.utilsService.getId(slug);
    // const categoryId = this.utilsService.getId(body.)
    await this.clientService.client.activity.update({
      where: { activity_id: id },
      data: { title: body.title },
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
