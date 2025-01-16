import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkoutSession } from 'src/tracking/schemas/workout-session';
import { WorkoutSessionDO } from 'src/tracking/models/workout-session';

@Injectable()
export class WorkoutSessionService {
  constructor(
    @InjectModel(WorkoutSession.name)
    private workoutSessionModel: Model<WorkoutSession>,
  ) {}

  async createWorkoutSession(
    createWorkoutSessionDO: WorkoutSessionDO,
  ): Promise<WorkoutSession> {
    const workoutSession = new this.workoutSessionModel(createWorkoutSessionDO);
    return await workoutSession.save();
  }

  async getWorkoutSessionByMemberId(): Promise<WorkoutSession[]> {
    // TODO: Remove hard coded member after enabling auth
    return await this.workoutSessionModel.where({ MemberId: 1 });
  }
}
