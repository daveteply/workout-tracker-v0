import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkoutSessionDTO } from '@repo/dto/src/workout-session';
import { Model } from 'mongoose';
import { WorkoutSession } from 'src/tracking/schemas/workout-session';
import { DataTransformsService } from '../data-transforms/data-transforms.service';
import { UtilsService } from 'src/services/utils/utils.service';

@Injectable()
export class WorkoutSessionService {
  constructor(
    @InjectModel(WorkoutSession.name)
    private workoutSessionModel: Model<WorkoutSession>,
    private dataTransforms: DataTransformsService,
    private utilsService: UtilsService,
  ) {}

  async createWorkoutSession(createWorkoutSessionDTO: WorkoutSessionDTO): Promise<WorkoutSession> {
    const memberId = this.utilsService.getId(createWorkoutSessionDTO.memberSlug as string);
    // transform object
    const workoutSessionData: WorkoutSession = {
      memberId: memberId,
      // default to current date if none provided
      sessionStart: createWorkoutSessionDTO.sessionStart || new Date(),
      sessionCompleted: createWorkoutSessionDTO.sessionCompleted,
      activitySets: this.dataTransforms.setsToSets(createWorkoutSessionDTO.activitySets as []),
      activitySetsCount: 0,
    };

    const workoutSession = new this.workoutSessionModel(workoutSessionData);
    return await workoutSession.save();
  }

  async getWorkoutSessionByMemberId(memberSlug: string): Promise<WorkoutSession[]> {
    const memberId = this.utilsService.getId(memberSlug);
    return await this.workoutSessionModel.where({ memberId }).sort({ ['sessionStart']: -1 });
  }
}
