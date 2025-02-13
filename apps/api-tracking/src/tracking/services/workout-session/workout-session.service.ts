import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkoutSessionDTO } from '@repo/dto/src/tracking/workout-session';
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

  async getWorkoutSession(memberSlug: string): Promise<WorkoutSession[]> {
    const memberId = this.utilsService.getId(memberSlug);
    return await this.workoutSessionModel.where({ memberId }).sort({ ['sessionStart']: -1 });
  }

  async getWorkoutSessionCategoryHistory(
    memberSlug: string,
    limit: number,
  ): Promise<{ categorySlug: string; categoryTitle: string }[]> {
    const memberId = this.utilsService.getId(memberSlug);
    return await this.workoutSessionModel.aggregate([
      { $match: { memberId: Number(memberId) } },
      { $sort: { sessionStart: -1 } },
      { $limit: Number(limit) },
      { $unwind: { path: '$activitySets' } },
      {
        $group: {
          _id: {
            categorySlug: '$activitySets.categorySlug',
            categoryTitle: '$activitySets.categoryTitle',
          },
        },
      },
      {
        $project: {
          _id: 0,
          categorySlug: '$_id.categorySlug',
          categoryTitle: '$_id.categoryTitle',
        },
      },
    ]);
  }

  async getWorkoutSessionActivityHistory(
    memberSlug: string,
    limit: number,
  ): Promise<{ activitySlug: string; activityTitle: string }[]> {
    const memberId = this.utilsService.getId(memberSlug);
    return await this.workoutSessionModel.aggregate([
      { $match: { memberId: Number(memberId) } },
      { $sort: { sessionStart: -1 } },
      { $limit: Number(limit) },
      { $unwind: { path: '$activitySets' } },
      {
        $group: {
          _id: {
            activitySlug: '$activitySets.activitySlug',
            activityTitle: '$activitySets.activityTitle',
          },
        },
      },
      {
        $project: {
          _id: 0,
          activitySlug: '$_id.activitySlug',
          activityTitle: '$_id.activityTitle',
        },
      },
    ]);
  }
}
