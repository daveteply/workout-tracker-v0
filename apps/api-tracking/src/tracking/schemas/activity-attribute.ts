import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class ActivityAttribute {
  @Prop({ required: true })
  attributeSlug?: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  attributeType: string;

  @Prop({ required: true, type: 'Mixed' })
  attributeValue?: string | number;
}

export type WorkoutAttributeDocument = HydratedDocument<ActivityAttribute>;
export const WorkoutAttributeSchema =
  SchemaFactory.createForClass(ActivityAttribute);
