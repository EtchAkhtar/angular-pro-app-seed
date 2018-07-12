import { Observable, BehaviorSubject } from 'rxjs';

import { User } from './auth/shared/services/auth/auth.service';
import { Meal } from './health/shared/services/meals/meals.service';
import { Workout } from './health/shared/services/workouts/workouts.service';
import { ScheduleItem } from './health/shared/services/schedule/schedule.service';

import { pluck, distinctUntilChanged } from 'rxjs/operators';

export interface State {
  user: User;
  meals: Meal[];
  mealsRetrieved: boolean;
  workouts: Workout[];
  workoutsRetrieved: boolean;
  date: Date;
  schedule: ScheduleItem[];
  selected: any;
  list: any;
  [key: string]: any;
}

const state: State = {
  user: undefined,
  meals: undefined,
  mealsRetrieved: undefined,
  workouts: undefined,
  workoutsRetrieved: undefined,
  date: undefined,
  schedule: undefined,
  selected: undefined,
  list: undefined
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
