import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { ActivityCategory } from '@prisma/client';
import { PrismaClientService } from 'src/services/prisma-client/prisma-client.service';
import { UtilsService } from 'src/services/utils/utils.service';

@Controller('activity-category')
export class ActivityCategoryController {
  constructor(
    private clientService: PrismaClientService,
    private utilsService: UtilsService,
  ) {}

  @Get()
  @Version('1')
  async getActivityCategories(): Promise<ActivityCategory[]> {
    return await this.clientService.client.activityCategory.findMany();
  }

  @Get(':slug')
  @Version('1')
  async getActivityCategory(@Param('slug') slug: string): Promise<ActivityCategory | null> {
    const id = this.utilsService.getId(slug);
    return await this.clientService.client.activityCategory.findUnique({
      where: { id: id },
    });
  }

  @Post()
  @Version('1')
  async createActivityCategory(@Body() body: any): Promise<void> {
    await this.clientService.client.activityCategory.create({
      data: { title: body.title, description: body.description },
    });
  }

  @Patch(':slug')
  @Version('1')
  async updateActivityCategory(@Param('slug') slug: string, @Body() body: any): Promise<void> {
    const id = this.utilsService.getId(slug);
    await this.clientService.client.activityCategory.update({
      where: { id: id },
      data: { title: body.title, description: body.description },
    });
  }

  @Delete(':slug')
  @Version('1')
  async deleteActivityCategory(@Param('slug') slug: string): Promise<void> {
    const id = this.utilsService.getId(slug);
    await this.clientService.client.activityCategory.delete({
      where: { id: id },
    });
  }
}
