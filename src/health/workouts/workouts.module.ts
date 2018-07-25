import { NgModule } from '@angular/core';
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
  { path: '', component: fromContainers.WorkoutsComponent },
  { path: 'new', component: fromContainers.WorkoutComponent },
  { path: ':id', component: fromContainers.WorkoutComponent }
];

@NgModule({
  imports: [ReactiveFormsModule, RouterModule.forChild(ROUTES), SharedModule],
  declarations: [...fromContainers.containers, ...fromComponents.components]
})
export class WorkoutsModule {}
