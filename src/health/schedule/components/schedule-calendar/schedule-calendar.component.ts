import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  ScheduleItem,
  ScheduleList
} from '../../../shared/services/schedule/schedule.service';

@Component({
  selector: 'schedule-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['schedule-calendar.component.scss'],
  template: `
    <div class="calendar">
      <schedule-controls
        [selected]="selectedDay"
        (move)="onChange($event)">
      </schedule-controls>

      <schedule-days
        [selected]="selectedDayIndex"
        (select)="selectDay($event)">
      </schedule-days>

      <schedule-section
        *ngFor="let section of sections"
        [name]="section.name"
        [section]="getSection(section.key)"
        (select)="selectSection($event, section.key)">
      </schedule-section>
    </div>
  `
})
export class ScheduleCalendarComponent implements OnChanges {
  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }

  @Input() items: ScheduleList;

  @Output() change: EventEmitter<Date> = new EventEmitter<Date>();

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  selectedDayIndex: number;
  selectedDay: Date;
  selectedWeek: Date;

  sections = [
    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'snacks', name: 'Snacks and Drinks' }
  ];

  constructor() {}

  ngOnChanges(): void {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  getSection(name: string): ScheduleItem {
    return (this.items && this.items[name]) || {};
  }

  selectSection({ type, assigned, data }: any, section: string): void {
    const day = this.selectedDay;
    this.select.emit({
      type,
      assigned,
      section,
      day,
      data
    });
  }

  onChange(weekOffset: number): void {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate()
    );

    startDate.setDate(startDate.getDate() + weekOffset * 7);
    this.change.emit(startDate);
  }

  selectDay(index: number): void {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  private getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    return new Date(date.setDate(diff));
  }

  private getToday(date: Date): number {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }

    return today;
  }
}
