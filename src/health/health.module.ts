import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// modules
import { MealsModule } from './meals/meals.module';

// routes
export const ROUTES: Routes = [
  {
    path: 'schedule',
    loadChildren: './schedule/schedule.module#ScheduleModule'
  },
  {
    path: 'meals',
    loadChildren: './meals/meals.module#MealsModule'
  },
  {
    path: 'workouts',
    loadChildren: './workouts/workouts.module#WorkoutsModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)]
})
export class HealthModule {}
