import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/services/utils/utils.service';
import { PrismaClientActivityService } from '../prisma-client-activity/prisma-client-activity.service';
import { ActivityAttribute } from '@prisma/client';
import { AttributeTypes } from 'src/activity/models/attribute-types';
import { AttributeDO } from 'src/activity/models/attribute';

@Injectable()
export class AttributeService {
  constructor(
    private prismaClientActivityService: PrismaClientActivityService,
    private utilsService: UtilsService,
  ) {}

  getActivityAttributeTypes(): string[] {
    return Object.values(AttributeTypes).filter((value) => typeof value === 'string');
  }

  async getActivityAttributes(): Promise<ActivityAttribute[]> {
    return await this.prismaClientActivityService.client.activityAttribute.findMany();
  }

  async createActivityAttribute(activityAttribute: AttributeDO): Promise<ActivityAttribute> {
    return await this.prismaClientActivityService.client.activityAttribute.create({
      data: {
        title: activityAttribute.title,
        description: activityAttribute.description,
        attributeType: activityAttribute.attributeType,
      },
    });
  }

  async updateActivityAttribute(activityAttribute: AttributeDO): Promise<ActivityAttribute | null> {
    if (activityAttribute.slug) {
      const id = this.utilsService.getId(activityAttribute.slug);
      return await this.prismaClientActivityService.client.activityAttribute.update({
        where: { id: id },
        data: {
          title: activityAttribute.title,
          description: activityAttribute.description,
          attributeType: activityAttribute.attributeType,
        },
      });
    } else return null;
  }

  async deleteActivityAttribute(slug: string): Promise<ActivityAttribute> {
    const id = this.utilsService.getId(slug);
    return await this.prismaClientActivityService.client.activityAttribute.delete({
      where: { id: id },
    });
  }
}
