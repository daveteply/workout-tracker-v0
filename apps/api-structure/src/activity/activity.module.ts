import { Module } from '@nestjs/common';

import { UtilsService } from 'src/services/utils/utils.service';

import { PrismaClientActivityService } from './services/prisma-client-activity/prisma-client-activity.service';

import { ActivityController } from './controllers/activity/activity.controller';
import { CategoryController } from './controllers/category/category.controller';
import { AttributeController } from './controllers/attribute/attribute.controller';
import { ActivityAttributeController } from './controllers/activity-attribute/activity-attribute.controller';

import { ActivityService } from './services/activity/activity.service';
import { CategoryService } from './services/category/category.service';
import { AttributeService } from './services/attribute/attribute.service';
import { ActivityAttributeService } from './services/activity-attribute/activity-attribute.service';

@Module({
  providers: [
    ActivityService,
    CategoryService,
    AttributeService,
    ActivityAttributeService,

    PrismaClientActivityService,
    UtilsService,
  ],
  controllers: [
    ActivityController,
    CategoryController,
    AttributeController,
    ActivityAttributeController,
  ],
})
export class ActivityModule {}
