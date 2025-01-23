import { ActivitySetDTO } from './activity-set.js';

export interface WorkoutSessionDTO {
  id?: string;
  memberId: number; // TODO change this to slug
  sessionStart?: Date;
  sessionCompleted?: Date;
  activitySets?: ActivitySetDTO[];

  // virtual
  activitySetsCount?: number;
}
