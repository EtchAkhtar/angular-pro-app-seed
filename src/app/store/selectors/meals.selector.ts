import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromMeals from '../reducers/meals.reducer';
import * as fromRouter from '../reducers/router.reducer';
import * as fromRouterSelectors from '../selectors/router.selector';
import { Meal } from '../models/meal.model';

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

export const getSelectedMeal = createSelector(
  getMealsEntities,
  fromRouterSelectors.getRouterState,
  (entities, router): Meal | {} => {
    return (router.state && entities[router.state.params.mealId]) || {};
  }
);
