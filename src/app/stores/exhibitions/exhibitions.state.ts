import { Exhibition } from "src/app/api/models";

export interface ExhibitionsState {
    exhibition: Exhibition
    exhibitions: Exhibition[]
    formSubmitted: boolean
    error: string | null;
    loading: boolean;
  }
  
  export const initialState: ExhibitionsState = {
    exhibition: null,
    exhibitions: [],
    formSubmitted: false,
    error: null,
    loading: false,
  };
  