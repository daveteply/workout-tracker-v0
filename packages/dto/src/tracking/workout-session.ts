import { ActivitySetDTO } from '../activity-set.js';

export interface WorkoutSessionDTO {
  id?: string;

  memberId?: number;
  memberSlug?: string;

  sessionStart?: Date;
  sessionCompleted?: Date;
  activitySets?: ActivitySetDTO[];

  // virtual
  activitySetsCount?: number;
}
