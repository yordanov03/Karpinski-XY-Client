import { Painting } from "src/app/api/models";

export interface PaintingState {
    painting: Painting
    formSubmitted: boolean
    error: string | null;
    loading: boolean;
  }
  
  export const initialState: PaintingState = {
    painting: null,
    formSubmitted: false,
    error: null,
    loading: false,
  };
  