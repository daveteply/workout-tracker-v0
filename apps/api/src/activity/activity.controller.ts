import { Controller, Get, Param } from '@nestjs/common';
import { activity } from '@prisma/client';
import { PrismaClientService } from 'src/services/prisma-client/prisma-client.service';
import { UtilsService } from 'src/services/utils/utils.service';

@Controller('activity')
export class ActivityController {
  constructor(
    private clientService: PrismaClientService,
    private utilService: UtilsService,
  ) {}

  @Get(':id')
  async getActivitiesByCategory(@Param() params: any): Promise<activity[]> {
    const id = this.utilService.getId(params?.id);
    const activities = await this.clientService.client.activity.findMany({
      where: { activity_id: id },
    });
    return activities;
  }
}
