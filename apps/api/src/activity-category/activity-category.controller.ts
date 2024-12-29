import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
  async getActivityCategories(): Promise<activity_category[]> {
    return await this.clientService.client.activity_category.findMany();
  }

  @Get(':slug')
  async getActivityCategory(@Param('slug') slug: string): Promise<activity_category | null> {
    const id = this.utilsService.getId(slug);
    return await this.clientService.client.activity_category.findUnique({
      where: { category_id: id },
    });
  }

  @Post()
  async createActivityCategory(@Body() body: any): Promise<void> {
    await this.clientService.client.activity_category.create({
      data: { title: body.title },
    });
  }

  @Patch(':slug')
  async updateActivityCategory(@Param('slug') slug: string, @Body() body: any): Promise<void> {
    const id = this.utilsService.getId(slug);
    await this.clientService.client.activity_category.update({
      where: { category_id: id },
      data: { title: body.title },
    });
  }

  @Delete(':slug')
  async deleteActivityCategory(@Param('slug') slug: string): Promise<void> {
    const id = this.utilsService.getId(slug);
    await this.clientService.client.activity_category.delete({
      where: { category_id: id },
    });
  }
}
