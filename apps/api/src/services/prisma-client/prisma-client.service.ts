import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class PrismaClientService {
  constructor(public utilsService: UtilsService) {
    this._client = new PrismaClient().$extends({
      result: {
        activity_category: {
          slug: {
            needs: { category_id: true },
            compute(activity_category) {
              return utilsService.getSqid(activity_category.category_id);
            },
          },
        },
        activity: {
          slug: {
            needs: { activity_id: true },
            compute(activity) {
              return utilsService.getSqid(activity.activity_id);
            },
          },
          categorySlug: {
            needs: { category_id: true },
            compute(activity) {
              return utilsService.getSqid(activity.category_id);
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
