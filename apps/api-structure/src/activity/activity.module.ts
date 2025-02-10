import { Module } from '@nestjs/common';

import { PrismaClientActivityService } from './services/prisma-client-activity/prisma-client-activity.service';

import { ActivityController } from './controllers/activity/activity.controller';
import { CategoryController } from './controllers/category/category.controller';
import { AttributeController } from './controllers/attribute/attribute.controller';
import { ActivityAttributeController } from './controllers/activity-attribute/activity-attribute.controller';

import { ActivityService } from './services/activity/activity.service';
import { CategoryService } from './services/category/category.service';
import { AttributeService } from './services/attribute/attribute.service';
import { ActivityAttributeService } from './services/activity-attribute/activity-attribute.service';
import { MemberController } from './controllers/member/member.controller';
import { MemberService } from './services/member/member.service';
import { UtilsService } from 'src/services/utils/utils.service';

@Module({
  providers: [
    UtilsService,
    ActivityService,
    CategoryService,
    AttributeService,
    ActivityAttributeService,
    PrismaClientActivityService,
    MemberService,
  ],
  controllers: [
    ActivityController,
    CategoryController,
    AttributeController,
    ActivityAttributeController,
    MemberController,
  ],
})
export class ActivityModule {}
