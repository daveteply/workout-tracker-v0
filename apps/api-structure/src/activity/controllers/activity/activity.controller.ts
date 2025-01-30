import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { Activity, Prisma } from '@prisma/client';
import { ActivityService } from 'src/activity/services/activity/activity.service';
import { ActivityDTO } from '@repo/dto/src/activity';

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
    return await this.activityService.getActivitiesByCategorySlug(categorySlug);
  }

  @Post()
  @Version('1')
  async createActivity(@Body() body: ActivityDTO): Promise<Activity | null> {
    const activity: ActivityDTO = {
      title: body.title,
      description: body.description,
      categorySlug: body.categorySlug,
    };
    return await this.activityService.createActivity(activity);
  }

  @Patch(':s')
  @Version('1')
  async updateActivityCategory(
    @Param('s') slug: string,
    @Body() body: ActivityDTO,
  ): Promise<Activity | null> {
    const activity: ActivityDTO = {
      slug: slug,
      title: body.title,
      description: body.description,
      categorySlug: body.categorySlug,
    };
    return await this.activityService.updateActivity(activity);
  }

  @Delete(':s')
  @Version('1')
  async deleteActivity(@Param('s') slug: string): Promise<Activity | null> {
    try {
      return await this.activityService.deleteActivity(slug);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new Error('Cannot delete Activity while it has Activity Attributes');
        }
      }
      return e;
    }
  }
}
