import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WorkoutSessionController } from './controllers/workout-session/workout-session.controller';
import { WorkoutSetController } from './controllers/workout-set/workout-set.controller';

import {
  WorkoutSession,
  WorkoutSessionSchema,
} from './schemas/workout-session';

import { WorkoutSessionService } from './services/workout-session/workout-session.service';
import { WorkoutSetService } from './services/workout-set/workout-set.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkoutSession.name, schema: WorkoutSessionSchema },
    ]),
  ],
  controllers: [WorkoutSessionController, WorkoutSetController],
  providers: [WorkoutSessionService, WorkoutSetService],
  exports: [MongooseModule],
})
export class TrackingModule {}
