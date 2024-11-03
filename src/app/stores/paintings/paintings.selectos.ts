import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaintingsState } from './paintings.state';

export const selectPaintingsState = createFeatureSelector<PaintingsState>('paintings');


export const selectLoading = createSelector(
  selectPaintingsState,
  (state: PaintingsState) => state.loading
);

export const selectError = createSelector(
  selectPaintingsState,
  (state: PaintingsState) => state.error
);

export const selectPainting = createSelector(
  selectPaintingsState,
  (state: PaintingsState) => state.painting
);

export const selectAvailablePaintings = createSelector(
  selectPaintingsState,
  (state: PaintingsState) => state.availablePaintings
);

export const selectPaintingsOnFocus = createSelector(
  selectPaintingsState,
  (state: PaintingsState) => state.paintingsOnFocus
);

export const selectPortfolioPaintings = createSelector(
  selectPaintingsState,
  (state: PaintingsState) => state.portfolioPaintings
);

export const selectPaintingName = createSelector(
  selectPaintingsState,
  (state: PaintingsState) => state.selectedPaintingName
);

export const selectPaintingsToSell = createSelector(
  selectPaintingsState,
  (state: PaintingsState) => state.paintingsToSell
);
