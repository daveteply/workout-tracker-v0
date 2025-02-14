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

  private getIdFromSlug(slug: string): number {
    return this.utilsService.getId(slug);
  }

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
    return this.prismaClientActivityService.client.activityAttribute.findMany();
  }

  async createActivityAttribute(
    activityAttribute: ActivityAttributeDTO,
  ): Promise<ActivityAttribute> {
    return this.prismaClientActivityService.client.activityAttribute.create({
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
    if (!activityAttribute.slug) return null;
    return this.prismaClientActivityService.client.activityAttribute.update({
      where: { id: this.getIdFromSlug(activityAttribute.slug) },
      data: {
        title: activityAttribute.title,
        description: activityAttribute.description,
        attributeType: activityAttribute.attributeType,
      },
    });
  }

  async deleteActivityAttribute(slug: string): Promise<ActivityAttribute> {
    return this.prismaClientActivityService.client.activityAttribute.delete({
      where: { id: this.getIdFromSlug(slug) },
    });
  }
}
