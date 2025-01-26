import { Body, Controller, Get, Post, Query, Version } from '@nestjs/common';
import { ActivitySet } from 'src/tracking/schemas/activity-set';
import { WorkoutSession } from 'src/tracking/schemas/workout-session';
import { WorkoutSetService } from 'src/tracking/services/workout-set/workout-set.service';

@Controller('workout-set')
export class WorkoutSetController {
  constructor(private workoutSetService: WorkoutSetService) {}

  @Post()
  @Version('1')
  async updateWorkoutSession(@Body() body: any): Promise<WorkoutSession | null> {
    return await this.workoutSetService.addSetsToSession(body.sessionId, body.activitySet);
  }

  @Get()
  @Version('1')
  async getActivitySetByActivitySlug(
    @Query('s') sessionId: string,
    @Query('a') activitySlug: string,
  ): Promise<ActivitySet[] | null> {
    return await this.workoutSetService.getActivitySetByActivitySlug(sessionId, activitySlug);
  }
}
