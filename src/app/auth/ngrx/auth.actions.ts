import { Action } from '@ngrx/store';

export const USER_TRY_SIGNUP = 'USER_TRY_SIGNUP';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_TRY_SIGNIN = 'USER_TRY_SIGNIN';
export const USER_SIGNIN = 'USER_SIGNIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_TOKEN = 'USER_TOKEN';

export class UserTrySignup implements Action {
  readonly type = 'USER_TRY_SIGNUP';

  constructor(public payload: { email: string, password: string }) { }
}

export class UserSignup implements Action {
  readonly type = USER_SIGNUP;
}

export class UserTrySignin implements Action {
  readonly type = 'USER_TRY_SIGNIN';

  constructor(public payload: { email: string, password: string }) { }
}

export class UserSignin implements Action {
  readonly type = USER_SIGNIN;
}

export class UserLogout implements Action {
  readonly type = USER_LOGOUT;
}

export class UserToken implements Action {
  readonly type = USER_TOKEN;

  constructor(public payload: string) { }
}

export type AuthActions =
UserTrySignup |
UserSignup |
UserTrySignin |
UserSignin |
UserLogout |
UserToken;
