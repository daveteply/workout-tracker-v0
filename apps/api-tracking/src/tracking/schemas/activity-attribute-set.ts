import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ActivityAttribute } from './activity-attribute';

@Schema()
export class ActivityAttributeSet {
  @Prop([ActivityAttribute])
  attributes?: ActivityAttribute[];
}

export type ActivityAttributeSetDocument = HydratedDocument<ActivityAttributeSet>;
export const ActivityAttributeSetSchema = SchemaFactory.createForClass(ActivityAttributeSet);
