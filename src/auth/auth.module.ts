import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// modules
import { SharedModule } from './shared/shared.module';

// 3rd party modules
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { LoggedInGuard } from './shared/guards/loggedin.guard';

// routes
export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        canActivate: [LoggedInGuard],
        loadChildren: './login/login.module#LoginModule'
      },
      {
        path: 'register',
        canActivate: [LoggedInGuard],
        loadChildren: './register/register.module#RegisterModule'
      }
    ]
  }
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey:
    process.env.firebase_apiKey || 'AIzaSyB21UPOlj4Bd0gbZ0zFfQyCxcuRLJBbIQQ',
  authDomain:
    process.env.firebase_authDomain ||
    'ultimate-angular-fitness-d38d9.firebaseapp.com',
  databaseURL:
    process.env.firebase_databaseURL ||
    'https://ultimate-angular-fitness-d38d9.firebaseio.com',
  projectId: process.env.firebase_projectId || 'ultimate-angular-fitness-d38d9',
  storageBucket:
    process.env.firebase_storageBucket ||
    'ultimate-angular-fitness-d38d9.appspot.com',
  messagingSenderId: process.env.firebase_messageSenderId || '499907024865'
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule {}
