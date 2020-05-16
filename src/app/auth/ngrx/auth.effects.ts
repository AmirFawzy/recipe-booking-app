import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import * as firebase from 'firebase';

import * as authActions from '../ngrx/auth.actions';
import { map, switchMap, mergeMap, tap, catchError } from 'rxjs/operators';
import { SingupService } from '../singup.service';

@Injectable()
export class AuthEffect {
  @Effect() authSignup: Observable<Action> = this.actions.pipe(
    ofType(authActions.USER_TRY_SIGNUP),
    map((action: authActions.UserTrySignup) => action.payload),
    switchMap(userData => {
      return from(firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password))
        .pipe(
          tap(response => this.authService.error.emit(false)),
          catchError(error => {
            this.authService.errorMsg.emit(error.message);
            if (error) {
              this.authService.error.emit(true);
            }
            throw error;
          })
        );
    }),
    switchMap(() => firebase.auth().currentUser.getIdToken()),
    mergeMap(token => {
      this.router.navigate(['/']);
      return [
        {
          type: authActions.USER_SIGNUP
        },
        {
          type: authActions.USER_TOKEN,
          payload: token
        }
      ] as Action[];
    })
  );

  @Effect() authSignin: Observable<Action> = this.actions.pipe(
    ofType(authActions.USER_TRY_SIGNIN),
    map((action: authActions.UserTrySignin) => action.payload),
    switchMap(userData => {
      return from(firebase.auth().signInWithEmailAndPassword(userData.email, userData.password))
        .pipe(
          tap(response => {
            if (response) {
              this.authService.loginSuccessfully.emit(true);
            } else {
              this.authService.loginSuccessfully.emit(false);
            }
          }),
          catchError(error => {
            this.authService.signinError = true;
            switch (error.code) {
              case 'auth/wrong-password':
                this.authService.signinErrorMsg.emit('Password not correct.');
                break;
              case 'auth/user-not-found':
                this.authService.signinErrorMsg.emit('Email and Password are wrong.');
                break;
              default: this.authService.signinErrorMsg.emit(error.message);
                break;
            }
            throw error;
          })
        );
    }),
    switchMap(() => firebase.auth().currentUser.getIdToken()),
    mergeMap(token => {
      return [
        {
          type: authActions.USER_SIGNIN
        },
        {
          type: authActions.USER_TOKEN,
          payload: token
        }
      ] as Action[];
    })
  );

  @Effect({ dispatch: false }) authLogout = this.actions.pipe(
    ofType(authActions.USER_LOGOUT),
    tap(() => this.router.navigate(['/']))
  );

  constructor(private actions: Actions, private router: Router, private authService: SingupService) {
  }
}
