import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/services/utils/utils.service';
import { PrismaClientActivityService } from '../prisma-client-activity/prisma-client-activity.service';
import { ActivityAttribute } from '@prisma/client';

@Injectable()
export class ActivityAttributeService {
  constructor(
    private prismaClientActivityService: PrismaClientActivityService,
    private utilsService: UtilsService,
  ) {}

  async getAttributesByActivity(activitySlug: string): Promise<ActivityAttribute[]> {
    const activityId = this.utilsService.getId(activitySlug);
    const data = await this.prismaClientActivityService.client.activityAttribute.findMany({
      where: {
        attributes: {
          some: {},
        },
      },
      include: {
        attributes: {
          where: {
            activityId: activityId,
          },
        },
      },
    });

    // TODO: can't get Prisma to filter these records, doing clumbsy extra filter for now :/
    return data.filter((attribute) => attribute.attributes.length);
  }
}
