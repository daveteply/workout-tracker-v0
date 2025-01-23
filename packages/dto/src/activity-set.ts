import { ActivityAttributeSetDTO } from './activity-attribute-set.js';

export interface ActivitySetDTO {
  activitySlug: String;
  setStart?: Date;
  setCompleted?: Date;
  attributeSets?: ActivityAttributeSetDTO[];
}
