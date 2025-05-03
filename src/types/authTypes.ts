export interface IUser {
  id: string;
  email: string;
  name: string;
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
