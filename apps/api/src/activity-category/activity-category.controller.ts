import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { activity_category } from '@prisma/client';
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
  async getActivityCategories(): Promise<activity_category[]> {
    return await this.clientService.client.activity_category.findMany();
  }

  @Get(':slug')
  @Version('1')
  async getActivityCategory(@Param('slug') slug: string): Promise<activity_category | null> {
    const id = this.utilsService.getId(slug);
    return await this.clientService.client.activity_category.findUnique({
      where: { category_id: id },
    });
  }

  @Post()
  @Version('1')
  async createActivityCategory(@Body() body: any): Promise<void> {
    await this.clientService.client.activity_category.create({
      data: { title: body.title },
    });
  }

  @Patch(':slug')
  @Version('1')
  async updateActivityCategory(@Param('slug') slug: string, @Body() body: any): Promise<void> {
    const id = this.utilsService.getId(slug);
    await this.clientService.client.activity_category.update({
      where: { category_id: id },
      data: { title: body.title },
    });
  }

  @Delete(':slug')
  @Version('1')
  async deleteActivityCategory(@Param('slug') slug: string): Promise<void> {
    const id = this.utilsService.getId(slug);
    await this.clientService.client.activity_category.delete({
      where: { category_id: id },
    });
  }
}
