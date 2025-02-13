import { Prop, Schema } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({})
export abstract class BaseSchema {
  @Prop({ default: () => randomUUID() })
  id?: string;
}
