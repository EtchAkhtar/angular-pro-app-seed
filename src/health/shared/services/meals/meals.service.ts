import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

import { Store } from "store";

import { AuthService } from "../../../../auth/shared/services/auth/auth.service";

import { Observable } from "rxjs";
import { tap, filter, map } from "rxjs/operators";

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {
  meals$: Observable<Meal[]> = this.db
    .list(`meals/${this.uid}`)
    .pipe(tap(next => this.store.set("meals", next)));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  getMeal(key: string) {
    if (!key) {
      return Observable.of({});
    }
    return this.store.select<Meal[]>("meals").pipe(
      filter(Boolean),
      map(meals => meals.find((meal: Meal) => meal.$key === key))
    );
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
