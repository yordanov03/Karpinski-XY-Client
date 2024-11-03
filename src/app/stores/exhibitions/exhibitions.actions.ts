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

export const loadExhibitions = createAction(
  '[Exhibition] Load Exhibitions');

export const loadExhibitionsSuccess = createAction(
  '[Exhibition] Load Exhibitions Success',
  props<{ exhibitions: Exhibition[] }>()
);

export const loadExhibitionsFailure = createAction(
  '[Exhibition] Load Exhibitions Failure',
  props<{ error: any }>()
);

export const deleteExhibition = createAction(
  '[Exhibition] Delete Exhibition',
  props<{ id: string }>()
);

export const deleteExhibitionSuccess = createAction(
  '[Exhibition] Delete Exhibition Success',
  props<{ id: string }>()
);

export const deleteExhibitionFailure = createAction(
  '[Exhibition] Delete Exhibition Failure',
  props<{ error: any }>()
);

export const getExhibition = createAction(
  '[Exhibition] Get Exhibition',
  props<{ id: string }>()
);

export const getExhibitionSuccess = createAction(
  '[Exhibition] Get Exhibition Success',
  props<{ exhibition: Exhibition }>()
);

export const getExhibitionFailure = createAction(
  '[Exhibition] Get Exhibition Failure',
  props<{ error: any }>()
);

export const getExhibitionToEdit = createAction(
  '[Exhibition] Get Exhibition To Edit',
  props<{ id: string }>()
);

export const getExhibitionToEditSuccess = createAction(
  '[Exhibition] Get Exhibition To Edit Success',
  props<{ exhibition: Exhibition }>()
);

export const getExhibitionToEditFailure = createAction(
  '[Exhibition] Get Exhibition To Edit Failure',
  props<{ error: any }>()
);

export const updateExhibition = createAction(
  '[Exhibition] Update Exhibition',
  props<{ exhibition: Exhibition }>()
);

export const updateExhibitionSuccess = createAction(
  '[Exhibition] Update Exhibition Success'
);

export const updateExhibitionFailure = createAction(
  '[Exhibition] Update Exhibition Failure',
  props<{ error: any }>()
);
