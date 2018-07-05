import { Component, OnInit, OnDestroy } from '@angular/core';

import { ScheduleService } from '../../../shared/services/schedule/schedule.service';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      <schedule-calendar
        [date]="date$ | async"
        (change)="changeDate($event)">
      </schedule-calendar>
    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$: Observable<Date>;
  subscriptions: Subscription[];

  constructor(private scheduleService: ScheduleService, private store: Store) {}

  ngOnInit() {
    this.date$ = this.store.select<Date>('date');
    this.subscriptions = [this.scheduleService.schedule$.subscribe()];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }
}
