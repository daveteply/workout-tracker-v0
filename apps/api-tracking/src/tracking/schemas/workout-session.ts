import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base-schema';
import { ActivitySet } from './activity-set';

@Schema({
  collection: 'workout_sessions',
})
export class WorkoutSession extends BaseSchema {
  @Prop({ required: true })
  memberId: number;

  @Prop()
  sessionStart: Date;

  @Prop()
  sessionCompleted: Date;

  @Prop([ActivitySet])
  activitySets: ActivitySet[];
}

export type WorkoutSessionDocument = HydratedDocument<WorkoutSession>;
export const WorkoutSessionSchema =
  SchemaFactory.createForClass(WorkoutSession);
