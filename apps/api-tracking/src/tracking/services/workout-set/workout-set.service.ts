import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ActivitySetDTO } from '@repo/dto/src/activity-set';
import { Model } from 'mongoose';
import { ActivitySet } from 'src/tracking/schemas/activity-set';
import { WorkoutSession } from 'src/tracking/schemas/workout-session';
import { DataTransformsService } from '../data-transforms/data-transforms.service';

@Injectable()
export class WorkoutSetService {
  constructor(
    @InjectModel(WorkoutSession.name)
    private workoutSessionModel: Model<WorkoutSession>,
    private dataTransforms: DataTransformsService,
  ) {}

  async addSetsToSession(
    sessionId: string,
    activityData: ActivitySetDTO,
  ): Promise<WorkoutSession | null> {
    const session = await this.workoutSessionModel.findOne({ id: sessionId });
    if (!session) return null;
    const sets: ActivitySet[] = this.dataTransforms.setsToSets([activityData]);
    session.activitySets?.push(...sets);
    return session.save();
  }

  async getActivitySetByActivitySlug(
    sessionId: string,
    activitySlug: string,
  ): Promise<ActivitySet[] | null> {
    const session = await this.workoutSessionModel.findOne({ id: sessionId });
    if (!session) return null;
    return session.activitySets.filter((a) => a.activitySlug === activitySlug);
  }
}
