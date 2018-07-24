import { Component, OnInit, OnDestroy } from '@angular/core';

import { MealsService } from '../../../shared/services/meals.service';
import { Meal } from '../../../../app/store/models/meal.model';

import { Store } from '@ngrx/store';
import * as fromStore from '../../../../app/store';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'meals',
  styleUrls: ['meals.component.scss'],
  template: `
    <div class="meals">
      <div class="meals__title">
        <h1>
          <img src="/img/food.svg">
          Your meals
        </h1>
        <a
          class="btn__add"
          [routerLink]="['../meals/new']">
          <img src="img/add-white.svg">
          New meal
        </a>
      </div>

      <div *ngIf="!(mealsLoading$ | async); else loading;">
        <div class="message" *ngIf="!((meals$ | async)?.length)">
          <img src="/img/face.svg">
          No meals, add a new meal to start
        </div>
        <list-item
          *ngFor="let meal of (meals$ | async)"
          [item]="meal"
          (remove)="removeMeal($event)">
        </list-item>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg">
          Fetching meals...
        </div>
      </ng-template>
    </div>
  `
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$: Observable<Meal[]>;
  mealsLoading$: Observable<boolean>;
  //  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private store: Store<fromStore.ApplicationState>
  ) {}

  ngOnInit(): void {
    //    this.subscription = this.mealsService.meals$.subscribe();
    //    this.meals$ = this.store.select<Meal[]>('meals');

    this.meals$ = this.store.select<Meal[]>(fromStore.getAllMeals);
    this.mealsLoading$ = this.store.select<boolean>(fromStore.getMealsLoading);

    this.store.dispatch(new fromStore.LoadMeals());
  }

  ngOnDestroy(): void {
    //    this.subscription.unsubscribe;
  }

  removeMeal(event: Meal): void {
    this.mealsService.removeMeal(event.$key);
  }
}
