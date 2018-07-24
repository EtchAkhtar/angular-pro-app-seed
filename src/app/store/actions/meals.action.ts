import { Action } from '@ngrx/store';

import { Meal } from '../models/meal.model';

// load meals
export const LOAD_MEALS = '[Health] Load Meals';
export const LOAD_MEALS_FAIL = '[Health] Load Meals Fail';
export const LOAD_MEALS_SUCCESS = '[Health] Load Meals Success';

export class LoadMeals implements Action {
  readonly type = LOAD_MEALS;
}

export class LoadMealsFail implements Action {
  readonly type = LOAD_MEALS_FAIL;
  constructor(public payload: any) {}
}

export class LoadMealsSuccess implements Action {
  readonly type = LOAD_MEALS_SUCCESS;
  constructor(public payload: Meal[]) {}
}

// action types
export type MealsAction = LoadMeals | LoadMealsFail | LoadMealsSuccess;
