import { createReducer, on } from '@ngrx/store';
import * as PaintingActions from './painting.actions';
import { initialState } from './painting.state';

export const paintingReducer = createReducer(
  initialState,
  on(PaintingActions.createPainting, (state) => ({...state, loading: true,})),
  on(PaintingActions.createPaintingSuccess, (state) => ({...state, loading: false,})),
  on(PaintingActions.createPaintingFailure, (state, { payload }) => ({...state, error: payload, loading: false})),

  on(PaintingActions.updatePainting, (state) => ({...state, loading: true,})),
  on(PaintingActions.updatePaintingSuccess, state => ({ ...state, error: null })),
  on(PaintingActions.updatePaintingFailure, (state, { error }) => ({ ...state, error })),

  on(PaintingActions.loadPaintingToEdit, state => ({ ...state, loading: true, error: null })),
  on(PaintingActions.loadPaintingToEditSuccess, (state, { painting }) => ({ ...state, painting, loading: false })),
  on(PaintingActions.loadPaintingToEditFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(PaintingActions.loadAvailablePaintingsSuccess, (state, { availablePaintings }) => ({ ...state, availablePaintings: [...availablePaintings], selectedPaintingName:''})),
  on(PaintingActions.loadAvailablePaintingsFailure, (state, { error }) => ({ ...state, error })),

  on(PaintingActions.loadPaintingsOnFocusSuccess, (state, { paintingsOnFocus }) => ({ ...state, paintingsOnFocus: [...paintingsOnFocus] })),
  on(PaintingActions.loadPaintingsOnFocusFailure, (state, { error }) => ({ ...state, error })),

  on(PaintingActions.deletePaintingSuccess, (state, { id }) => ({ ...state, paintings: state.availablePaintings.filter(painting => painting.id !== id), error: null })),
  on(PaintingActions.deletePaintingFailure, (state, { error }) => ({ ...state, error })),

  on(PaintingActions.loadPaintingSuccess, (state, { painting }) => ({...state, painting, error: null, selectedPaintingName:'' })),
  on(PaintingActions.loadPaintingFailure, (state, { error }) => ({...state, painting: null, error })),

  on(PaintingActions.makeInquiry, (state, { name }) => ({ ...state, selectedPaintingName: name }))
);
