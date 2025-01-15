import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class WorkoutAttribute {
  @Prop({ required: true })
  AttributeId: Number;

  @Prop({ required: true })
  AttributeValue: String;
}

export type WorkoutAttributeDocument = HydratedDocument<WorkoutAttribute>;
export const WorkoutAttributeSchema =
  SchemaFactory.createForClass(WorkoutAttribute);
