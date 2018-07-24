import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Store } from 'store';

import { AuthService } from '../../../auth/shared/services/auth/auth.service';

import { Observable, of } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

import { Meal } from '../../../app/store/models/meal.model';

@Injectable()
export class MealsService {
  meals$: Observable<any> = this.db
    .list(`meals/${this.uid}`)
    .snapshotChanges()
    .pipe(
      map(items => {
        const newItems = items.map(item => {
          return { $key: item.key, ...item.payload.val() };
        });
        return newItems;
      }),
      tap(next => {
        this.store.set('meals', next);
        this.store.set('mealsRetrieved', true);
      })
    );

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid(): string {
    return this.authService.user.uid;
  }

  getMeals() {
    return this.db
      .list(`meals/${this.uid}`)
      .snapshotChanges()
      .pipe(
        map(items => {
          const newItems = items.map(item => {
            return { $key: item.key, ...item.payload.val() } as Meal;
          });
          return newItems;
        }),
        tap(next => {
          this.store.set('meals', next);
          this.store.set('mealsRetrieved', true);
        })
      );
  }

  getMeal(key: string): Observable<Meal | {}> {
    if (!key) {
      return of({});
    }
    return this.store.select<Meal[]>('meals').pipe(
      filter(Boolean),
      map(meals => meals.find((meal: Meal) => meal.$key === key))
    );
  }

  addMeal(meal: Meal): any {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  updateMeal(key: string, meal: Meal): Promise<void> {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }

  removeMeal(key: string): Promise<void> {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
