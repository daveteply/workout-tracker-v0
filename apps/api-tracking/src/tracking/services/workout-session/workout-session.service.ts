import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkoutSessionDTO } from '@repo/dto/src/tracking/workout-session';
import { Model, PipelineStage } from 'mongoose';
import { WorkoutSession } from 'src/tracking/schemas/workout-session';
import { DataTransformsService } from '../data-transforms/data-transforms.service';
import { UtilsService } from 'src/services/utils/utils.service';
import { ActivitySet } from 'src/tracking/schemas/activity-set';

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
      activitySets: this.dataTransforms.setsDTOToSets(createWorkoutSessionDTO.activitySets as []),
    };

    const workoutSession = new this.workoutSessionModel(workoutSessionData);
    return workoutSession.save();
  }

  async getWorkoutSessions(
    memberSlug: string,
    itemsPerPage?: number,
    pageNumber?: number,
  ): Promise<WorkoutSession[]> {
    const memberId = this.utilsService.getId(memberSlug);
    const stages: PipelineStage[] = [
      { $match: { memberId: Number(memberId) } },
      { $sort: { sessionStart: -1 } },
      { $addFields: { activitySetsCount: { $size: '$activitySets' } } },
      { $project: { activitySets: false } },
    ];
    if (pageNumber) {
      const skip = (pageNumber - 1) * (itemsPerPage || 0);
      stages.push({ $skip: Number(skip) });
    }
    if (itemsPerPage) {
      stages.push({ $limit: Number(itemsPerPage) });
    }
    return this.workoutSessionModel.aggregate(stages);
  }

  async getWorkoutSessionCount(memberSlug: string): Promise<number> {
    const memberId = this.utilsService.getId(memberSlug);
    return this.workoutSessionModel.where({ memberId }).countDocuments();
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

  async getWorkoutSessionActivityAttributeHistory(
    memberSlug: string,
    activitySlug: string,
    limit: number,
  ): Promise<{ activitySets: ActivitySet[] }[]> {
    const memberId = this.utilsService.getId(memberSlug);
    return await this.workoutSessionModel.aggregate([
      { $match: { memberId: Number(memberId), 'activitySets.activitySlug': String(activitySlug) } },
      { $sort: { sessionStart: -1 } },
      { $limit: Number(limit) },
      {
        $project: {
          _id: 0,
          activitySets: {
            $filter: {
              input: '$activitySets',
              as: 'activitySet',
              cond: { $eq: ['$$activitySet.activitySlug', String(activitySlug)] },
            },
          },
        },
      },
      {
        $project: {
          activitySets: {
            $sortArray: {
              input: '$activitySets',
              sortBy: {
                setStart: -1,
              },
            },
          },
        },
      },
    ]);
  }
}
