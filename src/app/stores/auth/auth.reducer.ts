import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState, initialState } from './auth.state';  // Importing from separate file

const _authReducer = createReducer(
  initialState,
  
  on(AuthActions.loginSuccess, (state, { user }) => ({...state, isLoggedin: true, username: user.username})),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, isLoggedin: false, user: null, error: error })),

  on(AuthActions.logoutSuccess, (state) => ({ ...state, isLoggedin: false, username: '' })),
  on(AuthActions.logoutFailure, (state, { error }) => ({ ...state, isLoggedin: false, user: null, error })),

  on(AuthActions.registerSuccess, (state) => ({ ...state, isSignUpFailed: false, errorMessage: null})),
  on(AuthActions.registerFailure, (state, { error }) => ({...state, isSignUpFailed: true, errorMessage: error}))
);


export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return _authReducer(state, action);
}
