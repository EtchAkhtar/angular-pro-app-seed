import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as mealActions from '../actions/meals.action';
import * as fromServices from '../../services';

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
}
