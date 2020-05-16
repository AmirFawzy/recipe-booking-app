import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { SingupService } from './singup.service';
import * as fromApp from '../ngrx/app.reducers';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    // private signupServ: SingupService,
    private store: Store<fromApp.AppState>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // return this.signupServ.isAuthenticated();

    let authState: boolean;
    this.store.select('auth').pipe(take(1)).subscribe(authStat => authState = authStat.authenticated);

    if (authState) {
      return authState;
    } else {
      return;
    }
  }
}
