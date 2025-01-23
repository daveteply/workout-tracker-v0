import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/services/utils/utils.service';
import { PrismaClientActivityService } from '../prisma-client-activity/prisma-client-activity.service';
import { ActivityCategory } from '@prisma/client';
import { ActivityCategoryDTO } from '@repo/dto/src/activity-category';

@Injectable()
export class CategoryService {
  constructor(
    private prismaClientActivityService: PrismaClientActivityService,
    private utilsService: UtilsService,
  ) {}

  async createCategory(activityCategory: ActivityCategoryDTO): Promise<ActivityCategory> {
    return await this.prismaClientActivityService.client.activityCategory.create({
      data: {
        title: activityCategory.title,
        description: activityCategory.description,
      },
    });
  }

  async getCategories(): Promise<ActivityCategory[]> {
    return await this.prismaClientActivityService.client.activityCategory.findMany();
  }

  async getCategoryBySlug(slug: string): Promise<ActivityCategory | null> {
    const id = this.utilsService.getId(slug);
    return await this.prismaClientActivityService.client.activityCategory.findFirst({
      where: { id: id },
    });
  }

  async updateCategory(activityCategory: ActivityCategoryDTO): Promise<ActivityCategory | null> {
    if (activityCategory.slug) {
      const id = this.utilsService.getId(activityCategory.slug);
      return await this.prismaClientActivityService.client.activityCategory.update({
        where: { id: id },
        data: {
          title: activityCategory.title,
          description: activityCategory.description,
        },
      });
    } else return null;
  }

  async deleteActivityCategory(slug: string): Promise<ActivityCategory | null> {
    const id = this.utilsService.getId(slug);
    return await this.prismaClientActivityService.client.activityCategory.delete({
      where: { id: id },
    });
  }
}
