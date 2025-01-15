import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './services/mongoose-config/mongoose-config.service';
import { WorkoutSessionService } from './tracking/services/workout-session/workout-session.service';
import { TrackingModule } from './tracking/tracking.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    TrackingModule,
  ],
  controllers: [],
  providers: [MongooseConfigService, WorkoutSessionService],
})
export class AppModule {}
