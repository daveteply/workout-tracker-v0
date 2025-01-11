import { Body, Controller, Delete, Get, Param, Post, Query, Version } from '@nestjs/common';
import { ActivityActivityAttributes, ActivityAttribute } from '@prisma/client';
import { ActivityAttributeService } from 'src/activity/services/activity-attribute/activity-attribute.service';

@Controller('activity-attributes')
export class ActivityAttributeController {
  constructor(private activityAttributeService: ActivityAttributeService) {}

  @Get('activity/:s')
  @Version('1')
  async getAttributesByActivity(@Param('s') activitySlug: string): Promise<ActivityAttribute[]> {
    return await this.activityAttributeService.getAttributesByActivity(activitySlug);
  }

  @Post()
  @Version('1')
  async attachActivityAttribute(@Body() body: any): Promise<ActivityActivityAttributes> {
    return await this.activityAttributeService.attachActivityAttribute(
      body.activitySlug,
      body.attributeSlug,
    );
  }

  @Delete()
  @Version('1')
  async removeActivityAttribute(
    @Query('as') activitySlug: string,
    @Query('at') attributeSlug: string,
  ): Promise<ActivityActivityAttributes> {
    return await this.activityAttributeService.removeActivityAttribute(activitySlug, attributeSlug);
  }
}
