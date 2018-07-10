import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  ScheduleService,
  ScheduleItem
} from '../../../shared/services/schedule/schedule.service';

import {
  Meal,
  MealsService
} from '../../../shared/services/meals/meals.service';

import {
  Workout,
  WorkoutsService
} from '../../../shared/services/workouts/workouts.service';

import { Store } from 'store';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      <schedule-calendar
        [date]="date$ | async"
        [items]="schedule$ | async"
        (change)="changeDate($event)"
        (select)="changeSection($event)">
      </schedule-calendar>

      <schedule-assign
        *ngIf="open"
        [section]="selected$ | async"
        [list]="list$ | async"
        (update)="assignItem($event)"
        (cancel)="closeAssign()">
      </schedule-assign>
    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {
  open: boolean = false;

  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;
  subscriptions: Subscription[];

  constructor(
    private scheduleService: ScheduleService,
    private store: Store,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit(): void {
    this.date$ = this.store.select<Date>('date');
    this.schedule$ = this.store.select<ScheduleItem[]>('schedule');
    this.selected$ = this.store.select<any>('selected');
    this.list$ = this.store.select<Meal[] | Workout[]>('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeDate(date: Date): void {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any): void {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  assignItem(items: string[]): void {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }

  closeAssign(): void {
    this.open = false;
  }
}
