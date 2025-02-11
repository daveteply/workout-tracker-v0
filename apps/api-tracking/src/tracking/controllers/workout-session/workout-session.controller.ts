import { Body, Controller, Get, Param, Post, Query, Version } from '@nestjs/common';
import { WorkoutSession } from 'src/tracking/schemas/workout-session';
import { WorkoutSessionService } from 'src/tracking/services/workout-session/workout-session.service';
import { WorkoutSessionDTO } from '@repo/dto/src/tracking/workout-session';

@Controller('workout-session')
export class WorkoutSessionController {
  constructor(private workoutSessionService: WorkoutSessionService) {}

  @Get(':m')
  @Version('1')
  async getWorkoutSession(@Param('m') memberSlug: string): Promise<WorkoutSession[]> {
    return await this.workoutSessionService.getWorkoutSession(memberSlug);
  }

  @Get(':m/category-history')
  @Version('1')
  async getWorkSessionHistory(
    @Param('m') memberSlug: string,
    @Query('l') limit: number,
  ): Promise<{ categorySlug: string; categoryTitle: string }[]> {
    return await this.workoutSessionService.getWorkoutSessionCategoryHistory(memberSlug, limit);
  }

  @Post()
  @Version('1')
  async createWorkoutSession(@Body() body: WorkoutSessionDTO): Promise<WorkoutSession | null> {
    return await this.workoutSessionService.createWorkoutSession(body);
  }
}
