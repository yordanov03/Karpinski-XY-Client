import { createReducer, on } from '@ngrx/store';
import * as ExhibitionActions from './exhibition.actions';
import { initialState } from './exhibition.state';

export const exhibitionReducer = createReducer(
  initialState,
  
//   on(ExhibitionActions.createExhibition, state => ({
//     ...state,
//     // update state accordingly
//   })),
//   on(ExhibitionActions.createExhibitionSuccess, (state, { payload }) => ({
//     ...state,
//     // update state with the new exhibition
//   })),
//   on(ExhibitionActions.createExhibitionFailure, (state, { error }) => ({
//     ...state,
//     // handle the error
//   }))
);
