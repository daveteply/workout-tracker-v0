import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { WorkoutSession } from 'src/tracking/schemas/workout-session';
import { WorkoutSessionService } from 'src/tracking/services/workout-session/workout-session.service';
import { WorkoutSessionDTO } from '@repo/dto/src/workout-session';

@Controller('workout-session')
export class WorkoutSessionController {
  constructor(private workoutSessionService: WorkoutSessionService) {}

  @Get()
  @Version('1')
  async getWorkoutSession(): Promise<WorkoutSession[]> {
    // TODO: add member slug as parameter
    return await this.workoutSessionService.getWorkoutSessionByMemberId();
  }

  @Post()
  @Version('1')
  async createWorkoutSession(@Body() body: any): Promise<WorkoutSession | null> {
    const workoutSession: WorkoutSessionDTO = {
      memberId: body.memberId,
      // TODO: add to UI
      sessionStart: new Date(),
    };
    return await this.workoutSessionService.createWorkoutSession(workoutSession);
  }
}
