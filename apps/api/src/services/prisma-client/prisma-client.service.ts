import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class PrismaClientService {
  constructor(public utilsService: UtilsService) {
    this._client = new PrismaClient().$extends({
      result: {
        activityCategory: {
          slug: {
            needs: { id: true },
            compute(activity_category) {
              return utilsService.getSqid(activity_category.id);
            },
          },
        },
        activity: {
          slug: {
            needs: { id: true },
            compute(activity) {
              return utilsService.getSqid(activity.id);
            },
          },
          categorySlug: {
            needs: { categoryId: true },
            compute(activity) {
              return utilsService.getSqid(activity.categoryId);
            },
          },
        },
        activityAttribute: {
          slug: {
            needs: { id: true },
            compute(activity_attribute) {
              return utilsService.getSqid(activity_attribute.id);
            },
          },
        },
      },
    });
  }

  private _client;

  public get client() {
    return this._client;
  }
}
