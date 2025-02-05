import { ActivityAttributeSetDTO } from './activity-attribute-set.js';

export interface ActivitySetDTO {
  slug: string;
  title: string;
  start?: Date;
  completed?: Date;
  attributeSets?: ActivityAttributeSetDTO[];
}
