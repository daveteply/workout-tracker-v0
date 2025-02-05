import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class ActivityAttribute {
  @Prop({ required: true })
  slug?: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, type: 'Mixed' })
  value?: string | number;
}

export type WorkoutAttributeDocument = HydratedDocument<ActivityAttribute>;
export const WorkoutAttributeSchema = SchemaFactory.createForClass(ActivityAttribute);
