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

  private getIdFromSlug(slug: string): number {
    return this.utilsService.getId(slug);
  }

  async createCategory(activityCategory: ActivityCategoryDTO): Promise<ActivityCategory> {
    return this.prismaClientActivityService.client.activityCategory.create({
      data: {
        title: activityCategory.title,
        description: activityCategory.description,
      },
    });
  }

  async getCategories(): Promise<ActivityCategory[]> {
    return this.prismaClientActivityService.client.activityCategory.findMany();
  }

  async getCategoryBySlug(slug: string): Promise<ActivityCategory | null> {
    return this.prismaClientActivityService.client.activityCategory.findFirst({
      where: { id: this.getIdFromSlug(slug) },
    });
  }

  async updateCategory(activityCategory: ActivityCategoryDTO): Promise<ActivityCategory | null> {
    if (!activityCategory.slug) return null;
    return this.prismaClientActivityService.client.activityCategory.update({
      where: { id: this.getIdFromSlug(activityCategory.slug) },
      data: {
        title: activityCategory.title,
        description: activityCategory.description,
      },
    });
  }

  async deleteActivityCategory(slug: string): Promise<ActivityCategory | null> {
    return this.prismaClientActivityService.client.activityCategory.delete({
      where: { id: this.getIdFromSlug(slug) },
    });
  }
}
