import { useMutation, useQuery } from "@tanstack/react-query";
import {
  signInRequest,
  signOutRequest,
  verifyAcsessTokenResquest,
} from "../../services/auth/authServices";
import { getAccessToken, removeAccessToken, saveAccessToken } from "@/lib/utils";
import { ISignInPayload } from "@/types/authTypes";

export function useAuth() {
const token = getAccessToken();

  return useQuery({
    queryKey: ["validate-session"],
    queryFn: () => verifyAcsessTokenResquest,
    staleTime: Infinity,
    enabled: !!token,
  });
}

export function useSignIn() {
  return useMutation({
    mutationKey: ["signIn"],
    mutationFn: ({ email, password }: ISignInPayload) =>
      signInRequest({ email, password }),
    onSuccess: (data) => {
      saveAccessToken(data.accessToken);
    },
  });
}

export function useSignOut() {
  return useMutation({
    mutationKey: ["signOut"],
    mutationFn: signOutRequest,
    onSuccess: removeAccessToken,
  });
}
