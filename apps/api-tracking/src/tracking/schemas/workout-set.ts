import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { WorkoutAttribute } from './workout-attribute';

@Schema()
export class WorkoutSet {
  @Prop({ required: true })
  ActivityId: Number;

  @Prop()
  SetStart: Date;

  @Prop()
  SetCompleted: Date;

  @Prop([WorkoutAttribute])
  Attributes: WorkoutAttribute[];
}

export type WorkoutSetDocument = HydratedDocument<WorkoutSet>;
export const WorkoutSetSchema = SchemaFactory.createForClass(WorkoutSet);
