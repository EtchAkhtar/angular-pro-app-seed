import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// modules

// 3rd party modules
import { AngularFireDatabaseModule } from 'angularfire2/database';

// components
import * as fromComponents from './components';

// services
import * as fromServices from './services';

// pipes
import * as fromPipes from './pipes';

@NgModule({
  imports: [CommonModule, RouterModule, AngularFireDatabaseModule],
  declarations: [...fromComponents.components, ...fromPipes.pipes],
  exports: [...fromComponents.components, ...fromPipes.pipes, CommonModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [...fromServices.services]
    };
  }
}
