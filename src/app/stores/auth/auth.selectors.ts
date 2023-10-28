import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

// Selectors
export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.isLoggedin
);

export const selectUsername = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.username
);
