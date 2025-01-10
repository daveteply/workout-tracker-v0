import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/services/utils/utils.service';
import { PrismaClientActivityService } from '../prisma-client-activity/prisma-client-activity.service';
import { Activity } from '@prisma/client';
import { ActivityDO } from 'src/activity/models/activity';

@Injectable()
export class ActivityService {
  constructor(
    private prismaClientActivityService: PrismaClientActivityService,
    private utilsService: UtilsService,
  ) {}

  async createActivity(activiity: ActivityDO): Promise<Activity | null> {
    if (activiity.categorySlug) {
      const categoryId = this.utilsService.getId(activiity.categorySlug);
      return await this.prismaClientActivityService.client.activity.create({
        data: {
          categoryId: categoryId,
          title: activiity.title,
          description: activiity.description,
        },
      });
    } else {
      return null;
    }
  }

  async getAcitiviesByCategorySlug(categorySlug: string): Promise<Activity[]> {
    const categoryId = this.utilsService.getId(categorySlug);
    return this.prismaClientActivityService.client.activity.findMany({
      where: { categoryId: categoryId },
    });
  }

  async getActivities(): Promise<Activity[]> {
    return this.prismaClientActivityService.client.activity.findMany();
  }

  async getActivity(activitySlug: string): Promise<Activity | null> {
    const id = this.utilsService.getId(activitySlug);
    return this.prismaClientActivityService.client.activity.findFirst({
      where: { id: id },
    });
  }

  async updateActivity(activiity: ActivityDO): Promise<Activity | null> {
    if (activiity.activitySlug) {
      const id = this.utilsService.getId(activiity.activitySlug);
      return await this.prismaClientActivityService.client.activity.update({
        where: { id: id },
        data: {
          title: activiity.title,
          description: activiity.description,
        },
      });
    } else {
      return null;
    }
  }

  async deleteActivity(slug: string): Promise<Activity | null> {
    const id = this.utilsService.getId(slug);
    return await this.prismaClientActivityService.client.activity.delete({
      where: { id: id },
    });
  }
}
