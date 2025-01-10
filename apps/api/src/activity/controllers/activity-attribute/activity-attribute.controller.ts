import { Body, Controller, Get, Param, Post, Version } from '@nestjs/common';
import { ActivityAttribute } from '@prisma/client';
import { ActivityAttributeService } from 'src/activity/services/activity-attribute/activity-attribute.service';

@Controller('activity-attributes')
export class ActivityAttributeController {
  constructor(private activityAttributeService: ActivityAttributeService) {}

  @Get('activity/:s')
  @Version('1')
  async getAtributesByActivity(@Param('s') activitySlug: string): Promise<ActivityAttribute[]> {
    return await this.activityAttributeService.getAttributesByActivity(activitySlug);
  }
  //   const activityId = this.utilsService.getId(activitySlug);
  //   return await this.clientService.client.activity.findMany({
  //     where: {
  //       id: activityId,
  //     },
  //     include: {
  //       attributes: {
  //         include: { activityAttribute: true },
  //       },
  //     },
  //   });
  // }

  // @Post()
  // @Version('1')
  // async createActivity(@Body() body: any): Promise<void> {
  //   const activityId = this.utilsService.getId(body.activitySlug);
  //   const attributeId = this.utilsService.getId(body.attributeSlug);
  //   await this.clientService.client.activityActivityAttributes.create({
  //     data: {
  //       activityId: activityId,
  //       attributeId: attributeId,
  //     },
  //   });
  // }
}
