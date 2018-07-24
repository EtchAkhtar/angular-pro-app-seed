import * as fromMeals from '../actions/meals.action';
import { Meal } from '../models/meal.model';

export interface MealState {
  entities: { [key: string]: Meal };
  loaded: boolean;
  loading: boolean;
}

export const initialState: MealState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromMeals.MealsAction
): MealState {
  switch (action.type) {
    case fromMeals.LOAD_MEALS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromMeals.LOAD_MEALS_SUCCESS: {
      const meals = action.payload;

      const entities = meals.reduce(
        (entities: { [key: string]: Meal }, meal: Meal) => {
          return {
            ...entities,
            [meal.$key]: meal
          };
        },
        {}
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromMeals.LOAD_MEALS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getMealEntities = (state: MealState) => state.entities;
export const getMealsLoading = (state: MealState) => state.loading;
export const getMealsLoaded = (state: MealState) => state.loaded;
