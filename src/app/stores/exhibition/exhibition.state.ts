import { Exhibition } from "src/app/api/models";

export interface ExhibitionState {
    exhibition: Exhibition
    exhibitions: Exhibition[]
    formSubmitted: boolean
    error: string | null;
    loading: boolean;
  }
  
  export const initialState: ExhibitionState = {
    exhibition: null,
    exhibitions: [],
    formSubmitted: false,
    error: null,
    loading: false,
  };
  