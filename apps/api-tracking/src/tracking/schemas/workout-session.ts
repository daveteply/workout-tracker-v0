import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base-schema';
import { ActivitySet } from './activity-set';

@Schema({
  collection: 'workout_sessions',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class WorkoutSession extends BaseSchema {
  @Prop({ required: true })
  memberId: number;

  @Prop({ type: Date })
  sessionStart?: Date;

  @Prop({ type: Date })
  sessionCompleted?: Date;

  @Prop([ActivitySet])
  activitySets?: ActivitySet[];

  @Prop()
  activitySetsCount?: number;
}

export type WorkoutSessionDocument = HydratedDocument<WorkoutSession>;
export const WorkoutSessionSchema = SchemaFactory.createForClass(WorkoutSession);
