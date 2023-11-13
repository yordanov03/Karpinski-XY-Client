import { createAction, props } from '@ngrx/store';
import { Exhibition } from 'src/app/api/models';

export const createExhibition = createAction(
  '[Exhibition] Create Exhibition',
  props<{ payload: Exhibition }>()
);

export const createExhibitionSuccess = createAction(
  '[Exhibition] Create Exhibition Success',
  props<{ payload: Exhibition }>()
);

export const createExhibitionFailure = createAction(
  '[Exhibition] Create Exhibition Failure',
  props<{ error: any }>()
);
