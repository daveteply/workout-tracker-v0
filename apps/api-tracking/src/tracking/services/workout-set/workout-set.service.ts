import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ActivitySetDTO } from '@repo/dto/src/activity-set';
import { Model } from 'mongoose';
import { ActivitySet } from 'src/tracking/schemas/activity-set';
import { WorkoutSession } from 'src/tracking/schemas/workout-session';

@Injectable()
export class WorkoutSetService {
  constructor(
    @InjectModel(WorkoutSession.name)
    private workoutSessionModel: Model<WorkoutSession>,
  ) {}

  async addSetsToSession(
    sessionId: string,
    activityData: ActivitySetDTO,
  ): Promise<WorkoutSession | null> {
    const session = await this.workoutSessionModel.findOne({ id: sessionId });
    if (session) {
      session.activitySets?.push({
        activitySlug: activityData.activitySlug,
        attributeSets: activityData.attributeSets?.map((attributeSet) => {
          return {
            attributes: attributeSet.attributes.map((attribute) => {
              return {
                attributeSlug: attribute.slug,
                title: attribute.title,
                description: attribute.description,
                attributeType: attribute.attributeType,
                attributeValue: attribute.attributeValue,
              };
            }),
          };
        }),
      });

      session.save();
      return session;
    }
    return null;
  }

  async getActivitySetByActivitySlug(
    sessionId: string,
    activitySlug: string,
  ): Promise<ActivitySet[] | null> {
    const session = await this.workoutSessionModel.findOne({ id: sessionId });
    if (session) {
      return session.activitySets.filter(
        (a) => a.activitySlug === activitySlug,
      );
    }
    return null;
  }
}
