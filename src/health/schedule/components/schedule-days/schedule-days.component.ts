import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "schedule-days",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["schedule-days.component.scss"],
  template: `
    <div class="days">
      <button
        type="button"
        class="day"
        *ngFor="let day of days; index as i;"
        (click)="selectDay(i)">
        <span
          [class.active]="i === selected"> {{ day }}
        </span>
      </button>

    </div>
  `
})
export class ScheduleDaysComponent {
  @Input() selected: number;

  @Output() select: EventEmitter<number> = new EventEmitter<number>();

  days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  selectDay(index: number): void {
    this.select.emit(index);
  }
}
