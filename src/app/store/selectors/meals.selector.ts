import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromMeals from '../reducers/meals.reducer';

export const getMealsState = createFeatureSelector<fromMeals.MealState>(
  'meals'
);

export const getMealsEntities = createSelector(
  getMealsState,
  fromMeals.getMealEntities
);

export const getAllMeals = createSelector(getMealsEntities, entities =>
  Object.keys(entities).map((key: string) => entities[key])
);

export const getMealsLoaded = createSelector(
  getMealsState,
  fromMeals.getMealsLoaded
);
export const getMealsLoading = createSelector(
  getMealsState,
  fromMeals.getMealsLoading
);
