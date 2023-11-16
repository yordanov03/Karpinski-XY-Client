import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaintingState } from './painting.state';

export const selectPaintingState = createFeatureSelector<PaintingState>('painting');


export const selectLoading = createSelector(
  selectPaintingState,
  (state: PaintingState) => state.loading
);

export const selectError = createSelector(
  selectPaintingState,
  (state: PaintingState) => state.error
);

export const selectPainting = createSelector(
  selectPaintingState,
  (state: PaintingState) => state.painting
);

export const selectAvailablePaintings = createSelector(
  selectPaintingState,
  (state: PaintingState) => state.availablePaintings
);

export const selectPaintingsOnFocus = createSelector(
  selectPaintingState,
  (state: PaintingState) => state.paintingsOnFocus
);

export const selectPortfolioPaintings = createSelector(
  selectPaintingState,
  (state: PaintingState) => state.portfolioPaintings
);

export const selectPaintingName = createSelector(
  selectPaintingState,
  (state: PaintingState) => state.selectedPaintingName
);