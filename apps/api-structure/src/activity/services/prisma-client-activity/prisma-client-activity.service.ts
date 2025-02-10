import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UtilsService } from 'src/services/utils/utils.service';

@Injectable()
export class PrismaClientActivityService {
  constructor(public utilsService: UtilsService) {
    this._client = new PrismaClient().$extends({
      result: {
        activityCategory: {
          slug: {
            needs: { id: true },
            compute(activityCategory) {
              return utilsService.getSqid(activityCategory.id);
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
            compute(activityAttribute) {
              return utilsService.getSqid(activityAttribute.id);
            },
          },
        },
        member: {
          slug: {
            needs: { id: true },
            compute(member) {
              return utilsService.getSqid(member.id);
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
