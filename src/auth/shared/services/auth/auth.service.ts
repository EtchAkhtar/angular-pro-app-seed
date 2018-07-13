import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { Store } from 'store';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {
  auth$: Observable<firebase.User> = this.af.authState.pipe(
    tap(next => {
      if (!next) {
        this.store.set('user', null);
        return;
      }

      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      };

      this.store.set('user', user);
    })
  );

  constructor(private af: AngularFireAuth, private store: Store) {}

  get user(): any {
    return this.af.auth.currentUser;
  }

  get authState(): Observable<firebase.User> {
    return this.af.authState;
  }

  createUser(email: string, password: string): Promise<any> {
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser(): Promise<void> {
    return this.af.auth.signOut();
  }
}
