import { api } from "@/services/api/api";
import {
  IResponseAuth,
  ISignInPayload,
  ISignUpPayload,
} from "@/types/authTypes";
import { useMutation } from "@tanstack/react-query";
import { UseAuthentication } from "./authProvider";

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
  const { setAuthData } = UseAuthentication();

  return useMutation({
    mutationFn: async (payload: ISignInPayload) => {
      const data = await signInRequest(payload);
      setAuthData(data);
      return data;
    },
  });
};

export const useSignUp = () => {
  const { setAuthData } = UseAuthentication();

  return useMutation({
    mutationFn: async (payload: ISignUpPayload) => {
      const data = await signUpRequest(payload);
      setAuthData(data);
      return data;
    },
  });
};

export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};