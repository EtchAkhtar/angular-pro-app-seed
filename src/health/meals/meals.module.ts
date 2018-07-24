import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// modules
import { SharedModule } from '../shared/shared.module';

// containers
import * as fromContainers from './containers';

//components
import * as fromComponents from './components';

// routes
export const ROUTES: Routes = [
  { path: '', component: fromContainers.MealsComponent },
  { path: 'new', component: fromContainers.MealComponent },
  { path: ':mealId', component: fromContainers.MealComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components]
})
export class MealsModule {}
