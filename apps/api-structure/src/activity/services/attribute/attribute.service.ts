import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/services/utils/utils.service';
import { PrismaClientActivityService } from '../prisma-client-activity/prisma-client-activity.service';
import { ActivityAttribute } from '@prisma/client';
import { AttributeTypes } from '@repo/dto/src/attribute-types';
import { ActivityAttributeDTO } from '@repo/dto/src/activity-attribute';

@Injectable()
export class AttributeService {
  constructor(
    private prismaClientActivityService: PrismaClientActivityService,
    private utilsService: UtilsService,
  ) {}

  getActivityAttributeTypes(): string[] {
    return [
      AttributeTypes.LENGTH,
      AttributeTypes.MASS,
      AttributeTypes.NUMBER,
      AttributeTypes.STRING,
      AttributeTypes.TIME,
    ];
  }

  async getActivityAttributes(): Promise<ActivityAttribute[]> {
    return await this.prismaClientActivityService.client.activityAttribute.findMany();
  }

  async createActivityAttribute(
    activityAttribute: ActivityAttributeDTO,
  ): Promise<ActivityAttribute> {
    return await this.prismaClientActivityService.client.activityAttribute.create({
      data: {
        title: activityAttribute.title,
        description: activityAttribute.description,
        attributeType: activityAttribute.attributeType,
      },
    });
  }

  async updateActivityAttribute(
    activityAttribute: ActivityAttributeDTO,
  ): Promise<ActivityAttribute | null> {
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
