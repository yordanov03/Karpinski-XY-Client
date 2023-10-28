import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { LoginRequestModel, LoginResponseModel, RegisterRequestModel } from 'src/app/api/models';

export const login = createAction(
  '[Auth] Login', props<{ payload: LoginRequestModel }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success', props<{ user: LoginResponseModel }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure', props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const logoutFailure = createAction(
  '[Auth] Logout Failure', props<{ error: any }>()
);

export const register = createAction(
  '[Auth] Register', props<{ payload: RegisterRequestModel }>()
);

export const registerSuccess = createAction('[Auth] Register Success'
);

export const registerFailure = createAction(
  '[Auth] Register Failure', props<{ error: HttpErrorResponse }>()
);

