import { MealsGuard } from './meals.guard';
import { MealExistsGuards } from './meal-exists.guard';

export const guards: any[] = [MealsGuard, MealExistsGuards];

export * from './meals.guard';
export * from './meal-exists.guard';
