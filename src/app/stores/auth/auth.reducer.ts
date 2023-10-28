import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState, initialState } from './auth.state';  // Importing from separate file

const _authReducer = createReducer(
  initialState,
  
  on(AuthActions.loginSuccess, (state, { user }) => ({...state, isLoggedin: true, username: user.username})),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, isLoggedin: false, user: null, error: error })),

  on(AuthActions.logout, (state) => ({ ...state })),
  on(AuthActions.logoutSuccess, (state) => ({ ...state, isLoggedin: false, username: '' })),
  on(AuthActions.logoutFailure, (state, { error }) => ({ ...state, isLoggedin: false, user: null, error }))

);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return _authReducer(state, action);
}
