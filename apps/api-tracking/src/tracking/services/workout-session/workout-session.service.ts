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
    const workoutSessionData: WorkoutSession = {
      memberId,
      sessionStart: createWorkoutSessionDTO.sessionStart || new Date(),
      sessionCompleted: createWorkoutSessionDTO.sessionCompleted,
      activitySets: this.dataTransforms.setsToSets(createWorkoutSessionDTO.activitySets as []),
      activitySetsCount: 0,
    };

    const workoutSession = new this.workoutSessionModel(workoutSessionData);
    return workoutSession.save();
  }

  async getWorkoutSession(memberSlug: string): Promise<WorkoutSession[]> {
    const memberId = this.utilsService.getId(memberSlug);
    return this.workoutSessionModel.where({ memberId }).sort({ sessionStart: -1 });
  }

  private async getAggregateHistory(
    memberSlug: string,
    limit: number,
    field: string,
  ): Promise<{ slug: string; title: string }[]> {
    const memberId = this.utilsService.getId(memberSlug);
    return this.workoutSessionModel.aggregate([
      { $match: { memberId: Number(memberId) } },
      { $sort: { sessionStart: -1 } },
      { $limit: Number(limit) },
      { $unwind: { path: '$activitySets' } },
      {
        $group: {
          _id: {
            slug: `$activitySets.${field}Slug`,
            title: `$activitySets.${field}Title`,
          },
        },
      },
      {
        $project: {
          _id: 0,
          slug: `$_id.slug`,
          title: `$_id.title`,
        },
      },
    ]);
  }

  async getWorkoutSessionCategoryHistory(
    memberSlug: string,
    limit: number,
  ): Promise<{ categorySlug: string; categoryTitle: string }[]> {
    const res = await this.getAggregateHistory(memberSlug, limit, 'category');
    return res.map((r) => ({ categorySlug: r.slug, categoryTitle: r.title }));
  }

  async getWorkoutSessionActivityHistory(
    memberSlug: string,
    limit: number,
  ): Promise<{ activitySlug: string; activityTitle: string }[]> {
    const res = await this.getAggregateHistory(memberSlug, limit, 'activity');
    return res.map((r) => ({ activitySlug: r.slug, activityTitle: r.title }));
  }
}
