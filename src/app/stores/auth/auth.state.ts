import { LoginResponseModel } from "src/app/api/models";

export interface AuthState {
    isLoggedin: boolean,
    username: string,
    error: string
    isSignupSuccessful: boolean,
    isSignupFailed: boolean,
  }
  
  export const initialState: AuthState = {
    isLoggedin: false,
    username: '',
    error:'',
    isSignupFailed: false,
    isSignupSuccessful: false,
  };