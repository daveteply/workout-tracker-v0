import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { WorkoutSession } from 'src/tracking/schemas/workout-session';
import { WorkoutSessionDO } from 'src/tracking/models/workout-session';
import { WorkoutSessionService } from 'src/tracking/services/workout-session/workout-session.service';

@Controller('workout-session')
export class WorkoutSessionController {
  constructor(private workoutSessionService: WorkoutSessionService) {}

  @Get()
  @Version('1')
  async getWorkoutSession(): Promise<WorkoutSession[]> {
    // TODO: add member slug as paramater
    return await this.workoutSessionService.getWorkoutSessionByMemberId();
  }

  @Post()
  @Version('1')
  async createWorkoutSession(
    @Body() body: any,
  ): Promise<WorkoutSession | null> {
    const workoutSession: WorkoutSessionDO = {
      MemberId: body.memberId,
      // TODO: maybe server side?
      SessionStart: new Date(),
    };
    return await this.workoutSessionService.createWorkoutSession(
      workoutSession,
    );
  }
}
