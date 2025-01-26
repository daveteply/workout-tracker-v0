import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkoutSessionDTO } from '@repo/dto/src/workout-session';
import { Model } from 'mongoose';
import { WorkoutSession } from 'src/tracking/schemas/workout-session';

@Injectable()
export class WorkoutSessionService {
  constructor(
    @InjectModel(WorkoutSession.name)
    private workoutSessionModel: Model<WorkoutSession>,
  ) {}

  async createWorkoutSession(createWorkoutSessionDTO: WorkoutSessionDTO): Promise<WorkoutSession> {
    const workoutSession = new this.workoutSessionModel(createWorkoutSessionDTO);
    return await workoutSession.save();
  }

  // TODO: Remove hard coded member after enabling auth
  async getWorkoutSessionByMemberId(): Promise<WorkoutSession[]> {
    return await this.workoutSessionModel.where({
      memberId: 1,
    });
  }
}
