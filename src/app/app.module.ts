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
import { AppComponent } from './containers/app/app.component';

// components
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';

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
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    process.env.NODE_ENV !== 'production'
      ? StoreDevtoolsModule.instrument()
      : [],
    AuthModule,
    HealthModule
  ],
  declarations: [AppComponent, AppHeaderComponent, AppNavComponent],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {}
