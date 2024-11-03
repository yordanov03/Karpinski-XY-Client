import { Painting } from "src/app/api/models";

export interface PaintingsState {
    painting: Painting
    availablePaintings: Painting [],
    paintingsOnFocus: Painting[],
    portfolioPaintings: Painting[],
    paintingsToSell: Painting[],
    formSubmitted: boolean
    error: string | null;
    loading: boolean;
    selectedPaintingName: string
  }
  
  export const initialState: PaintingsState = {
    painting: null,
    availablePaintings: [],
    paintingsOnFocus: [],
    portfolioPaintings: [],
    paintingsToSell: [],
    formSubmitted: false,
    error: null,
    loading: false,
    selectedPaintingName: ''
  };
  