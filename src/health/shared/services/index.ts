import { MealsService } from './meals.service';
import { WorkoutsService } from './workouts.service';
import { ScheduleService } from './schedule.service';

export const services: any[] = [MealsService, WorkoutsService, ScheduleService];

export * from './meals.service';
export * from './workouts.service';
export * from './schedule.service';
