import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Store } from 'store';

import { AuthService } from '../../../auth/shared/services/auth/auth.service';
import { Meal } from '../../../app/store/models/meal.model';

import { Workout } from './workouts.service';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap, map, switchMap, withLatestFrom } from 'rxjs/operators';

export interface ScheduleItem {
  meals: Meal[];
  workouts: Workout[];
  section: string;
  timestamp: number;
  $key?: string;
}

export interface ScheduleList {
  morning?: ScheduleItem;
  lunch?: ScheduleItem;
  evening?: ScheduleItem;
  snacks?: ScheduleItem;
  [key: string]: any;
}

@Injectable()
export class ScheduleService {
  private date$: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  private section$: Subject<{}> = new Subject();
  private itemList$: Subject<{}> = new Subject();

  schedule$: Observable<ScheduleItem[]> = this.date$.pipe(
    tap((next: any) => this.store.set('date', next)),
    map((day: Date) => {
      const startAt = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      ).getTime();

      const endAt =
        new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate() + 1
        ).getTime() - 1;

      return { startAt, endAt };
    }),
    switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt)),
    map((data: any) => {
      const mapped: ScheduleList = {};
      for (const prop of data) {
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }

      return mapped;
    }),
    tap((next: any) => this.store.set('schedule', next))
  );

  selected$: Observable<any> = this.section$.pipe(
    tap((next: any) => this.store.set('selected', next))
  );

  list$: Observable<any> = this.section$.pipe(
    map((value: any) => this.store.value[value.type]),
    tap((next: any) => this.store.set('list', next))
  );

  items$: Observable<any> = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([items, section]: any[]) => {
      const { $key, ...data } = section.data;

      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };

      const payload = {
        ...($key ? data : defaults),
        ...items
      };

      if ($key) {
        return this.updateSection($key, payload);
      } else {
        return this.createSection(payload);
      }
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

  updateItems(items: string[]): void {
    this.itemList$.next(items);
  }

  updateDate(date: Date): void {
    this.date$.next(date);
  }

  selectSection(event: any): void {
    this.section$.next(event);
  }

  private updateSection(key: string, payload: ScheduleItem): Promise<void> {
    return this.db.object(`schedule/${this.uid}/${key}`).update(payload);
  }

  private createSection(payload: ScheduleItem): any {
    return this.db.list(`schedule/${this.uid}`).push(payload);
  }

  private getSchedule(startAt: number, endAt: number): Observable<any> {
    return this.db
      .list(`schedule/${this.uid}`, ref => {
        return ref
          .orderByChild('timestamp')
          .startAt(startAt)
          .endAt(endAt);
      })
      .snapshotChanges()
      .pipe(
        map(items => {
          const newItems = items.map(item => {
            return { $key: item.key, ...item.payload.val() };
          });
          return newItems;
        })
      );
  }
}
