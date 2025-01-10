import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Version } from '@nestjs/common';
import { Activity } from '@prisma/client';
import { ActivityDO } from 'src/activity/models/activity';
import { ActivityService } from 'src/activity/services/activity/activity.service';

@Controller('activities')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  @Version('1')
  async getActivities(): Promise<Activity[]> {
    return await this.activityService.getActivities();
  }

  @Get(':s')
  @Version('1')
  async getActivity(@Param('s') activitySlug: string): Promise<Activity | null> {
    return await this.activityService.getActivity(activitySlug);
  }

  @Get('category/:cs')
  @Version('1')
  async getActivitiesByCategory(@Param('cs') categorySlug: string): Promise<Activity[]> {
    return await this.activityService.getAcitiviesByCategorySlug(categorySlug);
  }

  @Post()
  @Version('1')
  async createActivity(@Body() body: any): Promise<Activity | null> {
    const activity: ActivityDO = {
      title: body.title,
      description: body.description,
      categorySlug: body.activityCategorySlug,
    };
    return await this.activityService.createActivity(activity);
  }

  @Patch(':slug')
  @Version('1')
  async updateActivityCategory(
    @Param('slug') slug: string,
    @Body() body: any,
  ): Promise<Activity | null> {
    const activity: ActivityDO = {
      activitySlug: slug,
      title: body.title,
      description: body.description,
      categorySlug: body.activityCategorySlug,
    };
    return await this.activityService.updateActivity(activity);
  }

  @Delete(':slug')
  @Version('1')
  async deleteActivity(@Param('slug') slug: string): Promise<void> {
    this.activityService.deleteActivity(slug);
  }
}
