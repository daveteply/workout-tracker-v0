import { Body, Controller, Get, Param, Post, Query, Version } from '@nestjs/common';
import { WorkoutSession } from 'src/tracking/schemas/workout-session';
import { WorkoutSessionService } from 'src/tracking/services/workout-session/workout-session.service';
import { WorkoutSessionDTO } from '@repo/dto/src/tracking/workout-session';
import { ActivitySetDTO } from '@repo/dto/src/activity-set';
import { DataTransformsService } from 'src/tracking/services/data-transforms/data-transforms.service';

@Controller('workout-session')
export class WorkoutSessionController {
  constructor(
    private workoutSessionService: WorkoutSessionService,
    private dataTransforms: DataTransformsService,
  ) {}

  @Get(':memberSlug')
  @Get(':memberSlug')
  @Version('1')
  getWorkoutSession(@Param('memberSlug') memberSlug: string): Promise<WorkoutSession[]> {
    return this.workoutSessionService.getWorkoutSession(memberSlug);
  }

  @Get(':memberSlug/category-history')
  @Version('1')
  getWorkSessionCategoryHistory(
    @Param('memberSlug') memberSlug: string,
    @Query('l') limit: number,
  ): Promise<{ categorySlug: string; categoryTitle: string }[]> {
    return this.workoutSessionService.getWorkoutSessionCategoryHistory(memberSlug, limit);
  }

  @Get(':memberSlug/activity-history')
  @Version('1')
  getWorkSessionActivityHistory(
    @Param('memberSlug') memberSlug: string,
    @Query('l') limit: number,
  ): Promise<{ activitySlug: string; activityTitle: string }[]> {
    return this.workoutSessionService.getWorkoutSessionActivityHistory(memberSlug, limit);
  }

  @Get(':memberSlug/activity-history/:activitySlug/attributes')
  @Version('1')
  async getWorkSessionActivityAttributeHistory(
    @Param('memberSlug') memberSlug: string,
    @Param('activitySlug') activitySlug: string,
    @Query('l') limit: number,
  ): Promise<ActivitySetDTO[]> {
    const setsOfSets = await this.workoutSessionService.getWorkoutSessionActivityAttributeHistory(
      memberSlug,
      activitySlug,
      limit,
    );
    const res = setsOfSets.map((s) => this.dataTransforms.setsToSetsDTO(s.activitySets));
    return res.flat();
  }

  @Post()
  @Version('1')
  createWorkoutSession(@Body() body: WorkoutSessionDTO): Promise<WorkoutSession | null> {
    return this.workoutSessionService.createWorkoutSession(body);
  }
}
