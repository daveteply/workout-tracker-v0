import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { ActivityCategory } from '@prisma/client';
import { CategoryService } from 'src/activity/services/category/category.service';
import { ActivityCategoryDTO } from '@repo/dto/src/activity-category';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @Version('1')
  async getActivityCategories(): Promise<ActivityCategory[]> {
    return await this.categoryService.getCategories();
  }

  @Get(':s')
  @Version('1')
  async getActivityCategory(@Param('s') slug: string): Promise<ActivityCategory | null> {
    return await this.categoryService.getCategoryBySlug(slug);
  }

  @Post()
  @Version('1')
  async createActivityCategory(@Body() body: ActivityCategoryDTO): Promise<ActivityCategory> {
    const activityCategory: ActivityCategoryDTO = {
      title: body.title,
      description: body.description,
    };
    return await this.categoryService.createCategory(activityCategory);
  }

  @Patch(':s')
  @Version('1')
  async updateActivityCategory(
    @Param('s') slug: string,
    @Body() body: ActivityCategoryDTO,
  ): Promise<ActivityCategory | null> {
    const activityCategory: ActivityCategoryDTO = {
      slug: slug,
      title: body.title,
      description: body.description,
    };
    return await this.categoryService.updateCategory(activityCategory);
  }

  @Delete(':s')
  @Version('1')
  async deleteActivityCategory(@Param('s') slug: string): Promise<ActivityCategory | null> {
    return await this.categoryService.deleteActivityCategory(slug);
  }
}
