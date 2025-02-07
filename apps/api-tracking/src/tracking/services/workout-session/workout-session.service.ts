import { Injectable, Options } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkoutSessionDTO } from '@repo/dto/src/workout-session';
import { Model } from 'mongoose';
import { WorkoutSession } from 'src/tracking/schemas/workout-session';
import { DataTransformsService } from '../data-transforms/data-transforms.service';

@Injectable()
export class WorkoutSessionService {
  constructor(
    @InjectModel(WorkoutSession.name)
    private workoutSessionModel: Model<WorkoutSession>,
    private dataTransforms: DataTransformsService,
  ) {}

  async createWorkoutSession(createWorkoutSessionDTO: WorkoutSessionDTO): Promise<WorkoutSession> {
    // transform object
    const workoutSessionData: WorkoutSession = {
      memberId: createWorkoutSessionDTO.memberId,
      // default to current date if none provided
      sessionStart: createWorkoutSessionDTO.sessionStart || new Date(),
      sessionCompleted: createWorkoutSessionDTO.sessionCompleted,
      activitySets: this.dataTransforms.setsToSets(createWorkoutSessionDTO.activitySets as []),
      activitySetsCount: 0,
    };

    const workoutSession = new this.workoutSessionModel(workoutSessionData);
    return await workoutSession.save();
  }

  // TODO: Remove hard coded member after enabling auth
  async getWorkoutSessionByMemberId(): Promise<WorkoutSession[]> {
    return await this.workoutSessionModel
      .where({
        memberId: 1,
      })
      .sort({ ['sessionStart']: -1 });
  }
}
