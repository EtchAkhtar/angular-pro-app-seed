import { Component, OnInit, OnDestroy } from '@angular/core';

import { MealsService } from '../../../shared/services/meals.service';
import { Meal } from '../../../../app/store/models/meal.model';

import * as fromStore from '../../../../app/store';
import { Store } from '@ngrx/store';

import { Observable, Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/img/food.svg">
          <span *ngIf="meal$ | async as meal; else title;">
            {{ meal.name ? 'Edit' : 'Create' }} meal
          </span>
          <ng-template #title>
            Loading...
          </ng-template>
        </h1>
      </div>
      <div *ngIf="meal$ | async as meal; else loading;">
        <meal-form
          [meal]="meal"
          (create)="addMeal($event)"
          (update)="updateMeal($event)"
          (remove)="removeMeal($event)">
        </meal-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg">
          <span *ngIf="mealsRetrieved$ | async; else notRetrieved;">
            Meal not found
          </span>
          <ng-template #notRetrieved>
            Fetching meal...
          </ng-template>
        </div>
      </ng-template>
    </div>
  `
})
export class MealComponent implements OnInit, OnDestroy {
  meal$: Observable<Meal | {}>;
  mealsRetrieved$: Observable<boolean>;
  //  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private store: Store<fromStore.ApplicationState>
  ) {}

  ngOnInit(): void {
    this.meal$ = this.store.select(fromStore.getSelectedMeal);
    //    this.mealsRetrieved$ = this.store.select<boolean>('mealsRetrieved');
    this.mealsRetrieved$ = of(true);
  }

  ngOnDestroy(): void {}

  async addMeal(event: Meal): Promise<void> {
    await this.mealsService.addMeal(event);
    //    this.backToMeals();
  }

  updateMeal(event: Meal): void {
    this.store.dispatch(new fromStore.UpdateMeal(event));
  }

  async removeMeal(event: Meal): Promise<void> {
    //    const key = this.route.snapshot.params.id;
    //    await this.mealsService.removeMeal(key);
    //    this.backToMeals();
  }
}
