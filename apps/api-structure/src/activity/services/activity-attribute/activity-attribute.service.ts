import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/services/utils/utils.service';
import { PrismaClientActivityService } from '../prisma-client-activity/prisma-client-activity.service';
import { ActivityActivityAttributes, ActivityAttribute } from '@prisma/client';

@Injectable()
export class ActivityAttributeService {
  constructor(
    private prismaClientActivityService: PrismaClientActivityService,
    private utilsService: UtilsService,
  ) {}

  private getIdFromSlug(slug: string): number {
    return this.utilsService.getId(slug);
  }

  async getAttributesByActivity(activitySlug: string): Promise<ActivityAttribute[]> {
    const activityId = this.getIdFromSlug(activitySlug);
    const data = await this.prismaClientActivityService.client.activityAttribute.findMany({
      where: {
        attributes: {
          some: { activityId },
        },
      },
      include: {
        attributes: true,
      },
    });

    // TODO: can't get Prisma to filter these records, doing clumsy extra filter for now :/
    return data.filter((attribute) => attribute.attributes.length);
  }

  async attachActivityAttribute(
    activitySlug: string,
    attributeSlug: string,
  ): Promise<ActivityActivityAttributes> {
    return this.prismaClientActivityService.client.activityActivityAttributes.create({
      data: {
        activityId: this.getIdFromSlug(activitySlug),
        attributeId: this.getIdFromSlug(attributeSlug),
      },
    });
  }

  async removeActivityAttribute(
    activitySlug: string,
    attributeSlug: string,
  ): Promise<ActivityActivityAttributes> {
    return this.prismaClientActivityService.client.activityActivityAttributes.delete({
      where: {
        activityId_attributeId: {
          activityId: this.getIdFromSlug(activitySlug),
          attributeId: this.getIdFromSlug(attributeSlug),
        },
      },
    });
  }
}
