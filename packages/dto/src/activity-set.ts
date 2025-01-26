import { ActivityAttributeSetDTO } from './activity-attribute-set.js';

export interface ActivitySetDTO {
  activitySlug: string;
  setStart?: Date;
  setCompleted?: Date;
  attributeSets?: ActivityAttributeSetDTO[];
}
