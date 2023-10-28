import { LoginResponseModel } from "src/app/api/models";

export interface AuthState {
    isLoggedin: boolean,
    username: string,
    error: string
  }
  
  export const initialState: AuthState = {
    isLoggedin: false,
    username: '',
    error:''
  };