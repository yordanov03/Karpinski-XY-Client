import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExhibitionState } from './exhibition.state';

export const selectExhibitionState = createFeatureSelector <ExhibitionState>('exhibition');

export const selectAllExhibitions = createSelector(
  selectExhibitionState,
  (state: ExhibitionState) => state.exhibitions
);

export const selectExhibition = createSelector(
  selectExhibitionState,
  (state: ExhibitionState) => state.exhibition
);
