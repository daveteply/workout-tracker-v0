import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [ConfigModule.forRoot(), ActivityModule],
  providers: [],
})
export class AppModule {}
