import { Body, Controller, Delete, Get, Param, Post, Query, Version } from '@nestjs/common';
import { ActivityActivityAttributes, ActivityAttribute } from '@prisma/client';
import { ActivityAttributeService } from 'src/activity/services/activity-attribute/activity-attribute.service';

@Controller('activity-attributes')
export class ActivityAttributeController {
  constructor(private activityAttributeService: ActivityAttributeService) {}

  @Get('activity/:activitySlug')
  @Version('1')
  getAttributesByActivity(
    @Param('activitySlug') activitySlug: string,
  ): Promise<ActivityAttribute[]> {
    return this.activityAttributeService.getAttributesByActivity(activitySlug);
  }

  @Post()
  @Version('1')
  attachActivityAttribute(
    @Body() body: { activitySlug: string; attributeSlug: string },
  ): Promise<ActivityActivityAttributes> {
    return this.activityAttributeService.attachActivityAttribute(
      body.activitySlug,
      body.attributeSlug,
    );
  }

  @Delete()
  @Version('1')
  removeActivityAttribute(
    @Query('as') activitySlug: string,
    @Query('at') attributeSlug: string,
  ): Promise<ActivityActivityAttributes> {
    return this.activityAttributeService.removeActivityAttribute(activitySlug, attributeSlug);
  }
}
