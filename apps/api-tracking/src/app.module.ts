import { Module } from '@nestjs/common';
import { TrackingModule } from './tracking/tracking.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TrackingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
