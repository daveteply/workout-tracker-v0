import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { WorkoutSet } from './workout-set';
import { BaseSchema } from './base-schema';

@Schema({
  collection: 'workout_sessions',
})
export class WorkoutSession extends BaseSchema {
  @Prop({ required: true })
  MemberId: number;

  @Prop({ required: true })
  SessionStart: Date;

  @Prop()
  SessionCompleted: Date;

  @Prop([WorkoutSet])
  Sets: WorkoutSet[];
}

export type WorkoutSessionDocument = HydratedDocument<WorkoutSession>;
export const WorkoutSessionSchema =
  SchemaFactory.createForClass(WorkoutSession);
