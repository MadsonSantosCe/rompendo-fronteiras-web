import { api } from "@/services/api/api";
import {
  IResponseAuth,
  ISignInPayload,
  ISignUpPayload,
} from "@/types/authTypes";
import { useMutation } from "@tanstack/react-query";

// Requisição para login
const signInRequest = async ({
  email,
  password,
}: ISignInPayload): Promise<IResponseAuth> => {
  const response = await api.post("/auth/sign-in", { email, password });
  return response.data;
};

// Requisição para cadastro
const signUpRequest = async ({
  name,
  email,
  password,
}: ISignUpPayload): Promise<IResponseAuth> => {
  const response = await api.post("/auth/sign-up", { name, email, password });
  return response.data;
};

// Hook React Query para login
export const useSignIn = () => {
  return useMutation({
    mutationFn: signInRequest,
  });
};

// Hook React Query para cadastro
export const useSignUp = () => {
  return useMutation({
    mutationFn: signUpRequest,
  });
};

// Apenas limpa storage
export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
