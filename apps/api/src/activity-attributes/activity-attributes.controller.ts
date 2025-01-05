import { Controller, Get, Param, Version } from '@nestjs/common';
import { activity_attributes } from '@prisma/client';
import { PrismaClientService } from 'src/services/prisma-client/prisma-client.service';
import { UtilsService } from 'src/services/utils/utils.service';

@Controller('activity-attributes')
export class ActivityAttributesController {
  constructor(
    private clientService: PrismaClientService,
    private utilsService: UtilsService,
  ) {}

  @Get()
  @Version('1')
  async getActivityAttributes(): Promise<activity_attributes[]> {
    return await this.clientService.client.activity_attributes.findMany();
  }

  @Get('activity/:s')
  @Version('1')
  async getActivitiesByCategory(@Param('s') categorySlug: string): Promise<activity_attributes[]> {
    const id = this.utilsService.getId(categorySlug);
    return await this.clientService.client.activity_attributes.findMany({
      where: { activity_id: id },
    });
  }
}
