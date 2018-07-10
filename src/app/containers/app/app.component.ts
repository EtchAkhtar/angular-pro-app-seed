import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs/observable";
import { Subscription } from "rxjs/Subscription";

import { Store } from "store";

import {
  AuthService,
  User
} from "../../../auth/shared/services/auth/auth.service";

@Component({
  selector: "app-root",
  styleUrls: ["app.component.scss"],
  template: `
    <div>
      <app-header
        [user]="user$ | async"
        (logout)="onLogout()">
      </app-header>
      <app-nav
        *ngIf="(user$ | async)?.authenticated">
      </app-nav>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>("user");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  async onLogout(): Promise<void> {
    try {
      await this.authService.logoutUser();
      this.router.navigate(["/auth/login"]);
    } catch (err) {
      // TODO
    }
  }
}
