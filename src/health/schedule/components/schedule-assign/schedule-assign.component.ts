import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import { Meal } from '../../../shared/models/meal.model';
import { Workout } from '../../../shared/services/workouts.service';

@Component({
  selector: 'schedule-assign',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['schedule-assign.component.scss'],
  template: `
    <div class="schedule-assign">

      <div class="schedule-assign__modal">
        <div class="schedule-assign__title">
          <h1>
            <img src="/img/{{ section.type === 'workouts' ? 'workout' : 'food' }}.svg">
            Assign {{ section.type }}
          </h1>
          <a
            class="button__add"
            [routerLink]="getRoute(section.type)">
            <img src="/img/add-white.svg">
            New {{ section.type }}
          </a>
        </div>

        <div class="schedule-assign__list">
          <span
            class="schedule-assign__empty"
            *ngIf="!list?.length">
            <img src="/img/face.svg">
            Nothing here to assign
          </span>
          <div
            *ngFor="let item of list"
            [class.active]="exists(item.name)"
            (click)="toggleItem(item.name)">
            {{ item.name }}
          </div>
        </div>

        <div class="schedule-assign__submit">
          <div>
            <button
              type="button"
              class="button"
              (click)="updateAssign()">
              Update
            </button>

            <button
              type="button"
              class="button button--cancel"
              (click)="cancelAssign()">
              Cancel
            </button>
          </div>
        </div>
      </div>

    </div>
  `
})
export class ScheduleAssignComponent implements OnInit {
  @Input() section: any;

  @Input() list: Meal[] | Workout[];

  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  private selected: string[] = [];

  ngOnInit(): void {
    this.selected = [...this.section.assigned];
  }

  getRoute(name: string): any[] {
    return [`../${name}/new`];
  }

  exists(name: string): boolean {
    return !!~this.selected.indexOf(name);
  }

  updateAssign(): void {
    this.update.emit({
      [this.section.type]: this.selected
    });
  }

  cancelAssign(): void {
    this.cancel.emit();
  }

  toggleItem(name: string): void {
    if (this.exists(name)) {
      this.selected = this.selected.filter(item => item !== name);
    } else {
      this.selected = [...this.selected, name];
    }
  }
}
