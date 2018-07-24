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

// update meal
export const UPDATE_MEAL = '[Health] Update Meal';
export const UPDATE_MEAL_FAIL = '[Health] Update Meal Fail';
export const UPDATE_MEAL_SUCCESS = '[Health] Update Meal Success';

export class UpdateMeal implements Action {
  readonly type = UPDATE_MEAL;
  constructor(public payload: Meal) {}
}

export class UpdateMealFail implements Action {
  readonly type = UPDATE_MEAL_FAIL;
  constructor(public payload: any) {}
}

export class UpdateMealSuccess implements Action {
  readonly type = UPDATE_MEAL_SUCCESS;
}

// create meal
export const CREATE_MEAL_SUCCESS = '[Health] Create Meal Success';

export class CreateMealSuccess implements Action {
  readonly type = CREATE_MEAL_SUCCESS;
}

// delete meal
export const DELETE_MEAL_SUCCESS = '[Health] Delete Meal Success';

export class DeleteMealSuccess implements Action {
  readonly type = DELETE_MEAL_SUCCESS;
}

// action types
export type MealsAction =
  | LoadMeals
  | LoadMealsFail
  | LoadMealsSuccess
  | UpdateMeal
  | UpdateMealFail
  | UpdateMealSuccess
  | CreateMealSuccess
  | DeleteMealSuccess;
