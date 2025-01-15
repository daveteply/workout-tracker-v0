import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutSessionController } from './controllers/workout-session/workout-session.controller';
import {
  WorkoutSession,
  WorkoutSessionSchema,
} from './schemas/workout-session';
import { WorkoutSessionService } from './services/workout-session/workout-session.service';
import { WorkoutSet, WorkoutSetSchema } from './schemas/workout-set';
import {
  WorkoutAttribute,
  WorkoutAttributeSchema,
} from './schemas/workout-attribute';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkoutSession.name, schema: WorkoutSessionSchema },
      // { name: WorkoutSet.name, schema: WorkoutSetSchema },
      // { name: WorkoutAttribute.name, schema: WorkoutAttributeSchema },
    ]),
  ],
  controllers: [WorkoutSessionController],
  providers: [WorkoutSessionService],
  exports: [MongooseModule],
})
export class TrackingModule {}
