import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { Activity, Prisma } from '@prisma/client';
import { ActivityService } from 'src/activity/services/activity/activity.service';
import { ActivityDTO, UpdateActivityDTO } from '@repo/dto/src/activity';

@Controller('activities')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  @Version('1')
  async getActivities(): Promise<Activity[]> {
    return this.activityService.getActivities();
  }

  @Get(':slug')
  @Version('1')
  async getActivity(@Param('slug') activitySlug: string): Promise<Activity | null> {
    return this.activityService.getActivity(activitySlug);
  }

  @Get('category/:categorySlug')
  @Version('1')
  async getActivitiesByCategory(@Param('categorySlug') categorySlug: string): Promise<Activity[]> {
    return this.activityService.getActivitiesByCategorySlug(categorySlug);
  }

  @Post()
  @Version('1')
  async createActivity(@Body() body: ActivityDTO): Promise<Activity | null> {
    return this.activityService.createActivity(body);
  }

  @Patch(':slug')
  @Version('1')
  async updateActivityCategory(
    @Param('slug') slug: string,
    @Body() body: UpdateActivityDTO,
  ): Promise<Activity | null> {
    return this.activityService.updateActivity({ ...body, slug });
  }

  @Delete(':slug')
  @Version('1')
  async deleteActivity(@Param('slug') slug: string): Promise<Activity | null> {
    try {
      return await this.activityService.deleteActivity(slug);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new Error('Cannot delete Activity while it has Activity Attributes');
        }
      }
      throw e;
    }
  }
}
