import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExhibitionsState } from './exhibitions.state';

export const selectExhibitionsState = createFeatureSelector <ExhibitionsState>('exhibitions');

export const selectAllExhibitions = createSelector(
  selectExhibitionsState,
  (state: ExhibitionsState) => state.exhibitions
);

export const selectExhibition = createSelector(
  selectExhibitionsState,
  (state: ExhibitionsState) => state.exhibition
);
