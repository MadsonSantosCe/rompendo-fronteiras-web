import { api } from "@/services/api/api";
import {
  IResponseAuth,
  ISignInPayload,
  ISignUpPayload,
} from "@/types/authTypes";
import { useMutation } from "@tanstack/react-query";

const signInRequest = async ({
  email,
  password,
}: ISignInPayload): Promise<IResponseAuth> => {
  const response = await api.post("/auth/sign-in", { email, password });
  return response.data;
};

const signUpRequest = async ({
  name,
  email,
  password,
}: ISignUpPayload): Promise<IResponseAuth> => {
  const response = await api.post("/auth/sign-up", { name, email, password });
  return response.data;
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: signInRequest,
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUpRequest,
  });
};

export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
