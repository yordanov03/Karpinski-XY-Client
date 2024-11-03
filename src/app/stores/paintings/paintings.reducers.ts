import { createReducer, on } from '@ngrx/store';
import * as PaintingActions from './paintings.actions';
import { initialState } from './paintings.state';

export const paintingsReducer = createReducer(
  initialState,
  
  on(PaintingActions.createPainting, (state) => ({...state, loading: true,})),
  on(PaintingActions.createPaintingSuccess, (state) => ({...state, loading: false, paintingsOnFocus:[], paintingsToSell:[], availablePaintings:[], portfolioPaintings:[]})),
  on(PaintingActions.createPaintingFailure, (state, { payload }) => ({...state, error: payload, loading: false})),

  on(PaintingActions.updatePainting, (state) => ({...state, loading: true, painting: state.painting })),
  on(PaintingActions.updatePaintingSuccess, state => ({ ...state, error: null, paintingsOnFocus:[], paintingsToSell:[], availablePaintings:[], portfolioPaintings:[], painting: null  })),
  on(PaintingActions.updatePaintingFailure, (state, { error }) => ({ ...state, error })),

  on(PaintingActions.loadPaintingToEdit, state => ({ ...state, loading: true, error: null })),
  on(PaintingActions.loadPaintingToEditSuccess, (state, { painting }) => ({ ...state, painting, loading: false })),
  on(PaintingActions.loadPaintingToEditFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(PaintingActions.loadAvailablePaintingsSuccess, (state, { availablePaintings }) => ({ ...state, availablePaintings: [...availablePaintings], selectedPaintingName:''})),
  on(PaintingActions.loadAvailablePaintingsFailure, (state, { error }) => ({ ...state, error })),

  on(PaintingActions.loadPaintingsOnFocusSuccess, (state, { paintingsOnFocus }) => ({ ...state, paintingsOnFocus: [...paintingsOnFocus] })),
  on(PaintingActions.loadPaintingsOnFocusFailure, (state, { error }) => ({ ...state, error })),

  on(PaintingActions.deletePaintingSuccess, (state, { id }) => ({ ...state, paintings: state.availablePaintings.filter(painting => painting.id !== id), 
    paintingsToSell: state.availablePaintings.filter(painting => painting.id !== id), error: null })),
  on(PaintingActions.deletePaintingFailure, (state, { error }) => ({ ...state, error })),

  on(PaintingActions.loadPaintingSuccess, (state, { painting }) => ({...state, painting, error: null, selectedPaintingName:'' })),
  on(PaintingActions.loadPaintingFailure, (state, { error }) => ({...state, painting: null, error })),

  on(PaintingActions.loadPortfolioPaintings, (state) => ({ ...state, loading: true, error: null })),
  on(PaintingActions.loadPortfolioPaintingsSuccess, (state, { portfolioPaintings }) => ({ ...state, loading: false, portfolioPaintings })),
  on(PaintingActions.loadPortfolioPaintingsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(PaintingActions.loadPaintingsToSell, state => ({...state, loading: true})),
  on(PaintingActions.loadPaintingsToSellSuccess, (state, { paintingsToSell }) => ({...state, loading: false, paintingsToSell})),
  on(PaintingActions.loadPaintingsToSellFailure, (state, { error }) => ({...state, loading: false, error})),

  on(PaintingActions.makeInquiry, (state, { name }) => ({ ...state, selectedPaintingName: name })),
);
