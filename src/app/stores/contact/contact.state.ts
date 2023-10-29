export interface ContactState {
  error: any;
  isSubmitted: boolean,
}

export const initialState: ContactState = {
  error: null,
  isSubmitted: false,
};
