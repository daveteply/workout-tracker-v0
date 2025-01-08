import { Body, Controller, Get, Param, Post, Version } from '@nestjs/common';
import { PrismaClientService } from 'src/services/prisma-client/prisma-client.service';
import { UtilsService } from 'src/services/utils/utils.service';

@Controller('activity-attributes')
export class ActivityAttributesController {
  constructor(
    private clientService: PrismaClientService,
    private utilsService: UtilsService,
  ) {}

  @Get('activity/:s')
  @Version('1')
  async getActivitiesByCategory(@Param('s') activitySlug: string): Promise<any> {
    const activityId = this.utilsService.getId(activitySlug);
    return await this.clientService.client.activity.findMany({
      where: {
        id: activityId,
      },
      include: {
        attributes: {
          include: { activityAttribute: true },
        },
      },
    });
  }

  @Post()
  @Version('1')
  async createActivity(@Body() body: any): Promise<void> {
    const activityId = this.utilsService.getId(body.activitySlug);
    const attributeId = this.utilsService.getId(body.attributeSlug);
    await this.clientService.client.activityActivityAttributes.create({
      data: {
        activityId: activityId,
        attributeId: attributeId,
      },
    });
  }
}
