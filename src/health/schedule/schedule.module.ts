import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// shared modules
import { SharedModule } from '../shared/shared.module';

// containers
import * as fromContainers from './containers';

//components
import * as fromComponents from './components';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.ScheduleComponent
  }
];

@NgModule({
  imports: [ReactiveFormsModule, RouterModule.forChild(ROUTES), SharedModule],
  declarations: [...fromContainers.containers, ...fromComponents.components]
})
export class ScheduleModule {}
