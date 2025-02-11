import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ActivityAttributeSet } from './activity-attribute-set';

@Schema()
export class ActivitySet {
  // the Activity being tracked
  @Prop({ required: true })
  activitySlug: string;

  @Prop()
  activityTitle: string;

  // Category
  @Prop({ required: true })
  categorySlug: string;

  @Prop()
  categoryTitle: string;

  @Prop({ type: Date })
  setStart?: Date;

  @Prop({ type: Date })
  setCompleted?: Date;

  @Prop([ActivityAttributeSet])
  attributeSets?: ActivityAttributeSet[];
}

export type ActivitySetDocument = HydratedDocument<ActivitySet>;
export const ActivitySetSchema = SchemaFactory.createForClass(ActivitySet);
