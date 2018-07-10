import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.authState.pipe(
      map(user => {
        if (user) {
          this.router.navigate(['/']);
        }

        return true;
      })
    );
  }
}
