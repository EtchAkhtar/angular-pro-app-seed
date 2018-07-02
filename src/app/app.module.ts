import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(ROUTES)],
  declarations: [AppComponent],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {}

/*
var config = {
    apiKey: "AIzaSyB21UPOlj4Bd0gbZ0zFfQyCxcuRLJBbIQQ",
    authDomain: "ultimate-angular-fitness-d38d9.firebaseapp.com",
    databaseURL: "https://ultimate-angular-fitness-d38d9.firebaseio.com",
    projectId: "ultimate-angular-fitness-d38d9",
    storageBucket: "ultimate-angular-fitness-d38d9.appspot.com",
    messagingSenderId: "499907024865"
  };
*/
