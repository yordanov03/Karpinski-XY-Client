import { createAction, props } from '@ngrx/store';

export const subscribe = createAction(
  '[Subscription] Subscribe',
  props<{ email: string }>()
);

export const subscribeSuccess = createAction(
  '[Subscription] Subscribe Success'
);

export const subscribeFailure = createAction(
  '[Subscription] Subscribe Failure',
  props<{ error: any }>()
);
