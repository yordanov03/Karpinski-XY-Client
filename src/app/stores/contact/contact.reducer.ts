import { createReducer, on } from '@ngrx/store';
import * as ContactActions from './contact.actions';
import { initialState } from './contact.state';

export const contactReducer = createReducer(
    initialState,
    on(ContactActions.submitContactForm, (state ) => ({...state, isSubmitted: true })),
    on(ContactActions.submitContactFormSuccess, (state) => ({...state, isSubmitted: false })),
    on(ContactActions.submitContactFormFailure, (state, { error }) => ({...state, error, isSubmitted: false })),
    on(ContactActions.setSubmitted, (state, { isSubmitted }) => ({...state, isSubmitted }))
  );
