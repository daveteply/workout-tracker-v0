import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/services/utils/utils.service';
import { PrismaClientActivityService } from '../prisma-client-activity/prisma-client-activity.service';
import { Activity } from '@prisma/client';
import { ActivityDTO } from '@repo/dto/src/activity';

@Injectable()
export class ActivityService {
  constructor(
    private prismaClientActivityService: PrismaClientActivityService,
    private utilsService: UtilsService,
  ) {}

  private getIdFromSlug(slug: string): number {
    return this.utilsService.getId(slug);
  }

  async createActivity(activity: ActivityDTO): Promise<Activity | null> {
    if (!activity.categorySlug) return null;
    return this.prismaClientActivityService.client.activity.create({
      data: {
        categoryId: this.getIdFromSlug(activity.categorySlug),
        title: activity.title,
        description: activity.description,
      },
    });
  }

  async getActivitiesByCategorySlug(categorySlug: string): Promise<Activity[]> {
    return this.prismaClientActivityService.client.activity.findMany({
      where: { categoryId: this.getIdFromSlug(categorySlug) },
    });
  }

  async getActivities(): Promise<Activity[]> {
    return this.prismaClientActivityService.client.activity.findMany();
  }

  async getActivity(activitySlug: string): Promise<Activity | null> {
    return this.prismaClientActivityService.client.activity.findFirst({
      where: { id: this.getIdFromSlug(activitySlug) },
    });
  }

  async updateActivity(activity: ActivityDTO): Promise<Activity | null> {
    if (!activity.slug) return null;
    return this.prismaClientActivityService.client.activity.update({
      where: { id: this.getIdFromSlug(activity.slug) },
      data: {
        title: activity.title,
        description: activity.description,
      },
    });
  }

  async deleteActivity(slug: string): Promise<Activity | null> {
    try {
      return this.prismaClientActivityService.client.activity.delete({
        where: { id: this.getIdFromSlug(slug) },
      });
    } catch (e) {
      throw e;
    }
  }
}
