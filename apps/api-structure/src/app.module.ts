import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ActivityModule } from './activity/activity.module';
import { UtilsService } from './services/utils/utils.service';

@Module({
  imports: [ConfigModule.forRoot(), ActivityModule],
  providers: [UtilsService],
})
export class AppModule {}
