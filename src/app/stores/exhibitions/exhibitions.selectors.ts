import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExhibitionsState } from './exhibitions.state';

export const selectExhibitionState = createFeatureSelector <ExhibitionsState>('exhibition');

export const selectAllExhibitions = createSelector(
  selectExhibitionState,
  (state: ExhibitionsState) => state.exhibitions
);

export const selectExhibition = createSelector(
  selectExhibitionState,
  (state: ExhibitionsState) => state.exhibition
);
