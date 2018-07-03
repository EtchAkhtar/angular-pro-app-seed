import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// modules

// 3rd party modules
import { AngularFireDatabaseModule } from 'angularfire2/database';

// components

// services
import { MealsService } from './services/meals/meals.service';

@NgModule({
  imports: [CommonModule, RouterModule, AngularFireDatabaseModule],
  declarations: [],
  exports: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [MealsService]
    };
  }
}
