import { createAction, emptyProps, props } from '@ngrx/store';
import { Painting } from 'src/app/api/models';

export const createPainting = createAction(
  '[Painting] Create Painting',
  props<{ payload: Painting }>()
);

export const createPaintingSuccess = createAction(
  '[Painting] Create Painting Success',
  emptyProps
);

export const createPaintingFailure = createAction(
  '[Painting] Create Painting Failure',
  props<{ payload: any }>()
);
