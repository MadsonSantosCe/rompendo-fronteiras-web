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

export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
