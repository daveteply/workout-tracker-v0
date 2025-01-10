import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ActivityModule } from './activity/activity.module';
import { TrackingModule } from './tracking/tracking.module';
import { UtilsService } from './services/utils/utils.service';

@Module({
  imports: [ConfigModule.forRoot(), ActivityModule, TrackingModule],
  providers: [AppService, UtilsService],
})
export class AppModule {}
