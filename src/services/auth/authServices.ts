import { api } from "@/services/api/api";
import {
  IResponseAuth,
  ISignInPayload,
  ISignUpPayload,
} from "@/types/authTypes";

export const signInRequest = async ({
  email,
  password,
}: ISignInPayload): Promise<IResponseAuth> => {
  const response = await api.post("/auth/sign-in", { email, password });
  return response.data;
};

export const signUpRequest = async ({
  name,
  email,
  password,
}: ISignUpPayload): Promise<IResponseAuth> => {
  const response = await api.post("/auth/sign-up", { name, email, password });
  return response.data;
};

export const signOutRequest = async (): Promise<void> => {
  await api.post("/auth/sign-out"); 
};

export const refreshTokenRequest = async (): Promise<IResponseAuth> => {
  const response = await api.post("/auth/refresh-token",);
  return response.data;
};

export const verifyEmailRequest = async (code: string): Promise<IResponseAuth> => {
  const response = await api.post("/auth/verify-email", { code });
  return response.data;
};

export const validateSessionRequest = async (): Promise<IResponseAuth> => {
  const response = await api.get("/auth/validate-session");
  return response.data;
};


