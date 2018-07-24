import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { Store } from 'store';

// feature modules
import { AuthModule } from '../auth/auth.module';
import { HealthModule } from '../health/health.module';

// containers
import * as fromContainers from './containers';

//components
import * as fromComponents from './components';

// services
import * as fromServices from './services';

// ngrx
import * as fromStore from './store';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'schedule'
  }
];

// reducers
export const metaReducers: MetaReducer<any>[] =
  process.env.NODE_ENV !== 'production' ? [storeFreeze] : [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(fromStore.reducers, { metaReducers }),
    EffectsModule.forRoot(fromStore.effects),
    process.env.NODE_ENV !== 'production'
      ? StoreDevtoolsModule.instrument()
      : [],
    AuthModule,
    HealthModule
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  providers: [Store, ...fromServices.services],
  bootstrap: [fromContainers.AppComponent]
})
export class AppModule {}
