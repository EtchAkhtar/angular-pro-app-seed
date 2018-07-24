import { ActionReducerMap } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

import * as fromRouter from './router.reducer';
import * as fromMeals from './meals.reducer';

export interface ApplicationState {
  routerReducer: RouterReducerState<fromRouter.RouterStateUrl>;
  meals: fromMeals.MealState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  routerReducer: routerReducer,
  meals: fromMeals.reducer
};
