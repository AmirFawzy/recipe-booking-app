import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as firebase from 'firebase';
import * as fromApp from '../ngrx/app.reducers';
import * as authActions from './ngrx/auth.actions';

@Injectable()
export class SingupService {
  errorMsg = new EventEmitter<string>();
  error = new EventEmitter<boolean>();
  loginSuccessfully = new EventEmitter<boolean>();
  signinError = false;
  signinErrorMsg = new EventEmitter<string>();
  // token: string;

  constructor(private store: Store<fromApp.AppState>) { }

  onSignup(mail: string, password: any) {
    firebase.auth().createUserWithEmailAndPassword(mail, password)
      .then(user => {
        this.store.dispatch(new authActions.UserSignup());

        firebase.auth().currentUser.getIdToken()
          .then(token => this.store.dispatch(new authActions.UserToken(token)));

        // this.error.emit(false);  // handeled by NgRx Effect
      })
      .catch(error => {
        /*this.errorMsg.emit(error.message);  // handeled by NgRx Effect
        if (error) {
          this.error.emit(true);
        }*/
      });
  }

  onSignin(email: string, password: any) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {

        this.store.dispatch(new authActions.UserSignin());

        firebase.auth().currentUser.getIdToken()
          .then(token => this.store.dispatch(new authActions.UserToken(token)));

        // if (response) {  // implelemnting in Effect ts file
        //   this.loginSuccessfully.emit(true);
        // }

      })
      .catch(error => {
        /*this.signinError = true;    // handeled by NgRx Effect

        switch (error.code) {
          case 'auth/wrong-password':
            this.signinErrorMsg.emit('Password not correct.');
            break;
          case 'auth/user-not-found':
            this.signinErrorMsg.emit('Email and Password are wrong.');
            break;
          default: this.signinErrorMsg.emit(error.message);
            break;
        }*/

      });
  }

  // getToken(): string {
  //   firebase.auth().currentUser.getIdToken()
  //     .then(
  //       (token: string) => this.token = token
  //     );
  //   return this.token;
  // }

  // isAuthenticated(): boolean {
  //   return this.token != null;
  // }

  // signout() {    // handeled by NgRx from header component
  //   firebase.auth().signOut();
  //   this.token = null;
  // }
}
