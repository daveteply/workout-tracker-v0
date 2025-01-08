import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { Activity } from '@prisma/client';
import { PrismaClientService } from 'src/services/prisma-client/prisma-client.service';
import { UtilsService } from 'src/services/utils/utils.service';

@Controller('activity')
export class ActivityController {
  constructor(
    private clientService: PrismaClientService,
    private utilsService: UtilsService,
  ) {}

  @Get('category/:cs')
  @Version('1')
  async getActivitiesByCategory(@Param('cs') categorySlug: string): Promise<Activity[]> {
    const id = this.utilsService.getId(categorySlug);
    return await this.clientService.client.activity.findMany({
      where: { categoryId: id },
    });
  }

  @Get(':s')
  @Version('1')
  async getActivity(@Param('s') activitySlug: string): Promise<Activity | null> {
    const id = this.utilsService.getId(activitySlug);
    return await this.clientService.client.activity.findFirst({
      where: { id: id },
    });
  }

  @Post()
  @Version('1')
  async createActivity(@Body() body: any): Promise<void> {
    const activityCategoryId = this.utilsService.getId(body.activityCategorySlug);
    await this.clientService.client.activity.create({
      data: { title: body.title, description: body.description, categoryId: activityCategoryId },
    });
  }

  @Patch(':slug')
  @Version('1')
  async updateActivityCategory(@Param('slug') slug: string, @Body() body: any): Promise<void> {
    const id = this.utilsService.getId(slug);
    await this.clientService.client.activity.update({
      where: { id: id },
      data: { title: body.title, description: body.description },
    });
  }

  @Delete(':slug')
  @Version('1')
  async deleteActivity(@Param('slug') slug: string): Promise<void> {
    const id = this.utilsService.getId(slug);
    await this.clientService.client.activity.delete({
      where: { id: id },
    });
  }
}
