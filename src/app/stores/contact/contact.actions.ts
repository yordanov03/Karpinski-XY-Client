import { createAction, props } from '@ngrx/store';
import { Contact } from 'src/app/api/models';


export const submitContactForm = createAction('[Contact] Submit', props<{ payload: Contact }>());
export const submitContactFormSuccess = createAction('[Contact] Submit Success');
export const submitContactFormFailure = createAction('[Contact] Submit Failure', props<{ error: any }>());
export const setSubmitted = createAction('[Contact] Set Submitted', props<{ isSubmitted: boolean }>());
