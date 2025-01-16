export interface WorkoutSessionDTO {
  Id: string;
  MemberId: number; // TODO change this to slug
  SessionStart: Date;
  SessionCompleted?: Date;
}
