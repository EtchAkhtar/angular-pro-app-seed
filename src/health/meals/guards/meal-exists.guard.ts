import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import * as fromStore from '../../../app/store';

import { Meal } from '../../../app/store/models/meal.model';

@Injectable()
export class MealExistsGuards implements CanActivate {
  constructor(private store: Store<fromStore.ApplicationState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const key = route.params.mealId;
        return this.hasMeal(key);
      })
    );
  }

  hasMeal(key: string): Observable<boolean> {
    return this.store.select(fromStore.getMealsEntities).pipe(
      map((entities: { [key: string]: Meal }) => !!entities[key]),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getMealsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadMeals());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
