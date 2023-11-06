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

//Update
export const updatePainting = createAction(
  '[Painting] Update Painting',
  props<{ painting: Painting }>()
);

export const updatePaintingSuccess = createAction(
  '[Painting] Update Painting Success'
);

export const updatePaintingFailure = createAction(
  '[Painting] Update Painting Failure',
  props<{ error: any }>()
);

export const loadPainting = createAction(
  '[Painting] Load Painting',
  props<{ id: string }>()
);

export const loadPaintingSuccess = createAction(
  '[Painting] Set Editing Painting',
  props<{ painting: Painting }>()
);

export const loadPaintingFailure = createAction(
  '[Painting] Load Painting Failure',
  props<{ error: any }>()
);

export const loadAvailablePaintings = createAction(
  '[Painting] Load Paintings'
);

export const loadAvailablePaintingsSuccess = createAction(
  '[Painting] Load Paintings Success',
  props<{ availablePaintings: Painting[] }>()
);

export const loadAvailablePaintingsFailure = createAction(
  '[Painting] Load Paintings Failure',
  props<{ error: any }>()
);

export const loadPaintingsOnFocus = createAction
('[PaintingsOnFocus] Load');

export const loadPaintingsOnFocusSuccess = createAction
('[PaintingsOnFocus] Load Success', 
props<{ paintingsOnFocus: Painting[] }>());

export const loadPaintingsOnFocusFailure = createAction
('[PaintingsOnFocus] Load Failure', 
props<{ error: any }>());

export const deletePainting = createAction(
  '[Painting List] Delete Painting',
  props<{ id: string }>()
);

export const deletePaintingSuccess = createAction(
  '[Painting API] Delete Painting Success',
  props<{ id: string }>()
);

export const deletePaintingFailure = createAction(
  '[Painting API] Delete Painting Failure',
  props<{ error: any }>()
);
