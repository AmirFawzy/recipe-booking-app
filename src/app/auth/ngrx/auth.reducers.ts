import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
}

const initState: State = {
  token: null,
  authenticated: false
};

export function AuthReducers(state = initState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.USER_SIGNUP:
    case AuthActions.USER_SIGNIN:
      return {
        ...state,
        authenticated: true
      } as State;
    case AuthActions.USER_LOGOUT:
      return {
        ...state,
        token: null,
        authenticated: false
      } as State;
    case AuthActions.USER_TOKEN:
      return {
        ...state,
        token: action.payload
      } as State;
    default:
      return state;
  }
}
