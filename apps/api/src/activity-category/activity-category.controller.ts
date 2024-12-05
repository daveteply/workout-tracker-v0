import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { activity_category } from '@prisma/client';
import { PrismaClientService } from 'src/services/prisma-client/prisma-client.service';
import { UtilsService } from 'src/services/utils/utils.service';

@Controller('activity-category')
export class ActivityCategoryController {
  constructor(
    private clientService: PrismaClientService,
    private utislService: UtilsService,
  ) {}

  @Get()
  async getActivityCategories(): Promise<activity_category[]> {
    return await this.clientService.client.activity_category.findMany();
  }

  @Post()
  async createActivityCategory(@Body() body: any): Promise<void> {
    await this.clientService.client.activity_category.create({
      data: { title: body.title },
    });
  }

  @Delete(':slug')
  async deleteActivityCategory(@Param('slug') slug: string): Promise<void> {
    const id = this.utislService.getId(slug);
    await this.clientService.client.activity_category.delete({
      where: { category_id: id },
    });
  }
}
