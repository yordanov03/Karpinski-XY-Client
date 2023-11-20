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
on(ExhibitionActions.loadExhibitions, state => ({
  ...state,
  // reset errors or set loading state if needed
})),
on(ExhibitionActions.loadExhibitionsSuccess, (state, { exhibitions }) => ({
  ...state,
  exhibitions,
  error: null
})),
on(ExhibitionActions.loadExhibitionsFailure, (state, { error }) => ({
  ...state,
  error
})),

on(ExhibitionActions.deleteExhibitionSuccess, (state, { id }) => ({
  ...state,
  exhibitions: state.exhibitions.filter(exhibition => exhibition.id !== id)
})),
on(ExhibitionActions.deleteExhibitionFailure, (state, { error }) => ({
  ...state,
  // handle error
})),

on(ExhibitionActions.getExhibitionSuccess, (state, { exhibition }) => ({
  ...state,
  exhibition
})),
on(ExhibitionActions.getExhibitionFailure, (state, { error }) => ({
  ...state,
  error
})),

on(ExhibitionActions.getExhibitionToEditSuccess, (state, { exhibition }) => ({ ...state, exhibition })),
  on(ExhibitionActions.getExhibitionToEditFailure, (state, { error }) => ({ ...state, error })),

  on(ExhibitionActions.updateExhibitionSuccess, state => ({ ...state, updated: true })),
  on(ExhibitionActions.updateExhibitionFailure, (state, { error }) => ({ ...state, error }))
);
