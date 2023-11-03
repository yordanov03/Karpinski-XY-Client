export interface PaintingState {
    paintingData: FormData | null;
    formSubmitted: boolean
    error: string | null;
    loading: boolean;
  }
  
  export const initialState: PaintingState = {
    paintingData: null,
    formSubmitted: false,
    error: null,
    loading: false,
  };
  