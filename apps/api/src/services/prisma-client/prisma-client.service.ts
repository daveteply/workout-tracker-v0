import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class PrismaClientService {
  constructor(public utilService: UtilsService) {
    this._client = new PrismaClient().$extends({
      result: {
        activity_category: {
          slug: {
            needs: { category_id: true },
            compute(activity_category) {
              return utilService.getSqid(activity_category.category_id);
            },
          },
        },
        activity: {
          slug: {
            needs: { category_id: true },
            compute(activity) {
              return utilService.getSqid(activity.category_id);
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
