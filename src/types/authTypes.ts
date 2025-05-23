import { AxiosResponse } from "axios";

export interface IUser {
  id: string;
  email: string;
  name: string;
  verified: boolean;
}

export interface IResponseAuth {
  message: string;
  token: string;
  user: IUser;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ISignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface IAuthContext {
  user: IUser | null;
  signIn: (payload: ISignInPayload) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (payload: ISignUpPayload) => Promise<void>;
  verifyAcessToken: () => Promise<AxiosResponse>;
}
