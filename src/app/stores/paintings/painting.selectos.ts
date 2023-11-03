import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaintingState } from './painting.state';

export const selectPaintingState = createFeatureSelector<PaintingState>('painting');

export const selectPaintingData = createSelector(
  selectPaintingState,
  (state: PaintingState) => state.paintingData
);

export const selectLoading = createSelector(
  selectPaintingState,
  (state: PaintingState) => state.loading
);

export const selectError = createSelector(
  selectPaintingState,
  (state: PaintingState) => state.error
);

export const selectFormSubmitted = createSelector(
  selectPaintingState,
  (state: PaintingState) => state.formSubmitted
);
