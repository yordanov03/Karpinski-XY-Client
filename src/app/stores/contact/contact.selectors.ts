import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactState } from './contact.state';

export const selectContactFeature = createFeatureSelector<ContactState>('contact');

export const selectContactError = createSelector(
  selectContactFeature,
  (state: ContactState) => state.error
);

export const selectIsSubmitted = createSelector(
    selectContactFeature,
    (state: ContactState) => state.isSubmitted
  );
  
