import { Body, Controller, Get, Post, Query, Version } from '@nestjs/common';
import { ActivitySetDTO } from '@repo/dto/src/activity-set';
import { ActivitySet } from 'src/tracking/schemas/activity-set';
import { WorkoutSession } from 'src/tracking/schemas/workout-session';
import { WorkoutSetService } from 'src/tracking/services/workout-set/workout-set.service';

@Controller('workout-set')
export class WorkoutSetController {
  constructor(private workoutSetService: WorkoutSetService) {}

  @Post()
  @Version('1')
  updateWorkoutSession(
    @Body() body: { sessionId: string; activitySet: ActivitySetDTO },
  ): Promise<WorkoutSession | null> {
    return this.workoutSetService.addSetsToSession(body.sessionId, body.activitySet);
  }

  @Get()
  @Version('1')
  getActivitySetByActivitySlug(
    @Query('s') sessionId: string,
    @Query('a') activitySlug: string,
  ): Promise<ActivitySet[] | null> {
    return this.workoutSetService.getActivitySetByActivitySlug(sessionId, activitySlug);
  }
}
