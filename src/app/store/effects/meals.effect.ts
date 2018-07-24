import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as mealActions from '../actions/meals.action';
import * as fromServices from '../../services';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Meal } from '../models/meal.model';

@Injectable()
export class MealsEffects {
  constructor(
    private actions$: Actions,
    private dataService: fromServices.DataService
  ) {}

  @Effect()
  loadMeals$ = this.actions$.ofType(mealActions.LOAD_MEALS).pipe(
    switchMap(() => {
      return this.dataService.getMeals().pipe(
        map(meals => new mealActions.LoadMealsSuccess(meals)),
        catchError(error => of(new mealActions.LoadMealsFail(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  updateMeal$ = this.actions$.ofType(mealActions.UPDATE_MEAL).pipe(
    map((action: mealActions.UpdateMeal) => action.payload),
    switchMap(meal => {
      const { $key, ...mealBase } = meal;
      return fromPromise(this.dataService.updateMeal($key, mealBase as Meal));
    })
  );
}
