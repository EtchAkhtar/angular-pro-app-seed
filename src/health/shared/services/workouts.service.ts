import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Store } from 'store';

import { AuthService } from '../../../auth/shared/services/auth/auth.service';

import { Observable, of } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

export interface Workout {
  name: string;
  type: string;
  strength: any;
  endurance: any;
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class WorkoutsService {
  workouts$: Observable<any> = this.db
    .list(`workouts/${this.uid}`)
    .snapshotChanges()
    .pipe(
      map(items => {
        const newItems = items.map(item => {
          return { $key: item.key, ...item.payload.val() };
        });
        return newItems;
      }),
      tap(next => {
        this.store.set('workouts', next);
        this.store.set('workoutsRetrieved', true);
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

  getWorkout(key: string): Observable<Workout | {}> {
    if (!key) {
      return of({});
    }
    return this.store.select<Workout[]>('workouts').pipe(
      filter(Boolean),
      map(workouts => workouts.find((workout: Workout) => workout.$key === key))
    );
  }

  addWorkout(workout: Workout): any {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout): Promise<void> {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string): Promise<void> {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }
}
