import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "schedule-controls",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["schedule-controls.component.scss"],
  template: `
    <div class="controls">
      <button
        type="button"
        (click)="moveDate(offset - 1)">
        <img src="/img/chevron-left.svg">
      </button>
      <p>{{ selected | date: 'MMMM d, y' }}</p>
      <button
        type="button"
        (click)="moveDate(offset + 1)">
        <img src="/img/chevron-right.svg">
      </button>

    </div>
  `
})
export class ScheduleControlsComponent {
  @Input() selected: Date;

  @Output() move = new EventEmitter<number>();

  offset = 0;

  moveDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }
}
