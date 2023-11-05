import { Painting } from "src/app/api/models";

export interface PaintingState {
    painting: Painting
    availablePaintings: Painting [],
    paintingsOnFocus: Painting[],
    formSubmitted: boolean
    error: string | null;
    loading: boolean;
  }
  
  export const initialState: PaintingState = {
    painting: null,
    availablePaintings: [],
    paintingsOnFocus: [],
    formSubmitted: false,
    error: null,
    loading: false,
  };
  