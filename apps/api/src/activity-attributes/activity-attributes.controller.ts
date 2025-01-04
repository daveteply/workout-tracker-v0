import { Controller, Get, Version } from '@nestjs/common';
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
}
