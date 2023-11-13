import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExhibitionState } from './exhibition.state';

export const selectExhibitionState = createFeatureSelector <ExhibitionState>('exhibition');

export const selectExhibitions = createSelector(
  selectExhibitionState,
  (state: ExhibitionState) => state.exhibitions
);
