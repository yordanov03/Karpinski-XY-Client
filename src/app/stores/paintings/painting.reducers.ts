import { createReducer, on } from '@ngrx/store';
import * as paintingActions from './painting.actions';
import { initialState } from './painting.state';

export const paintingReducer = createReducer(
  initialState,
  on(paintingActions.createPainting, (state) => ({...state, loading: true,})),
  on(paintingActions.createPaintingSuccess, (state, ) => ({...state, loading: false,})),
  on(paintingActions.createPaintingFailure, (state, { payload }) => ({...state, error: payload, loading: false}))
);
