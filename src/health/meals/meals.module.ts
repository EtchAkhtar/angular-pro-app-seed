import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// modules
import { SharedModule } from '../shared/shared.module';

// containers
import * as fromContainers from './containers';

//components
import * as fromComponents from './components';

// guards
import * as fromGuards from './guards';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.MealsGuard],
    component: fromContainers.MealsComponent
  },
  {
    path: 'new',
    component: fromContainers.MealComponent
  },
  {
    path: ':mealId',
    canActivate: [fromGuards.MealExistsGuards],
    component: fromContainers.MealComponent
  }
];

@NgModule({
  imports: [ReactiveFormsModule, RouterModule.forChild(ROUTES), SharedModule],
  providers: [...fromGuards.guards],
  declarations: [...fromContainers.containers, ...fromComponents.components]
})
export class MealsModule {}
