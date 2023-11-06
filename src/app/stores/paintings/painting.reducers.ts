import { createReducer, on } from '@ngrx/store';
import * as paintingActions from './painting.actions';
import { initialState } from './painting.state';

export const paintingReducer = createReducer(
  initialState,
  on(paintingActions.createPainting, (state) => ({...state, loading: true,})),
  on(paintingActions.createPaintingSuccess, (state) => ({...state, loading: false,})),
  on(paintingActions.createPaintingFailure, (state, { payload }) => ({...state, error: payload, loading: false})),

  on(paintingActions.updatePainting, (state) => ({...state, loading: true,})),
  on(paintingActions.updatePaintingSuccess, state => ({ ...state, error: null })),
  on(paintingActions.updatePaintingFailure, (state, { error }) => ({ ...state, error })),

  on(paintingActions.loadPainting, state => ({ ...state, loading: true, error: null })),
  on(paintingActions.loadPaintingSuccess, (state, { painting }) => ({ ...state, painting, loading: false })),
  on(paintingActions.loadPaintingFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(paintingActions.loadAvailablePaintingsSuccess, (state, { availablePaintings }) => ({ ...state, availablePaintings: [...availablePaintings] })),
  on(paintingActions.loadAvailablePaintingsFailure, (state, { error }) => ({ ...state, error })),

  on(paintingActions.loadPaintingsOnFocusSuccess, (state, { paintingsOnFocus }) => ({ ...state, paintingsOnFocus: [...paintingsOnFocus] })),
  on(paintingActions.loadPaintingsOnFocusFailure, (state, { error }) => ({ ...state, error })),

  on(paintingActions.deletePaintingSuccess, (state, { id }) => ({ ...state, paintings: state.availablePaintings.filter(painting => painting.id !== id), error: null })),
  on(paintingActions.deletePaintingFailure, (state, { error }) => ({ ...state, error })),
);
