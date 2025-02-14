import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { ActivityCategory } from '@prisma/client';
import { CategoryService } from 'src/activity/services/category/category.service';
import { ActivityCategoryDTO } from '@repo/dto/src/activity-category';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @Version('1')
  getActivityCategories(): Promise<ActivityCategory[]> {
    return this.categoryService.getCategories();
  }

  @Get(':slug')
  @Version('1')
  getActivityCategory(@Param('slug') slug: string): Promise<ActivityCategory | null> {
    return this.categoryService.getCategoryBySlug(slug);
  }

  @Post()
  @Version('1')
  createActivityCategory(@Body() body: ActivityCategoryDTO): Promise<ActivityCategory> {
    return this.categoryService.createCategory(body);
  }

  @Patch()
  @Version('1')
  updateActivityCategory(@Body() body: ActivityCategoryDTO): Promise<ActivityCategory | null> {
    return this.categoryService.updateCategory(body);
  }

  @Delete(':slug')
  @Version('1')
  deleteActivityCategory(@Param('slug') slug: string): Promise<ActivityCategory | null> {
    return this.categoryService.deleteActivityCategory(slug);
  }
}
