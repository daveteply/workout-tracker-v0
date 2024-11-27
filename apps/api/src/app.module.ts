import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaClientService } from './services/prisma-client/prisma-client.service';

import { ActivityCategoryController } from './activity-category/activity-category.controller';
import { ActivityController } from './activity/activity.controller';
import { UtilsService } from './services/utils/utils.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, ActivityCategoryController, ActivityController],
  providers: [AppService, PrismaClientService, UtilsService],
})
export class AppModule {}
