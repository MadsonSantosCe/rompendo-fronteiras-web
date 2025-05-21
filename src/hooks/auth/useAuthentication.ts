import { UseAuth } from "@/contexts/auth/authProvider";
import { ISignInPayload, ISignUpPayload } from "@/types/authTypes";
import { getAccessToken } from "@/utils/stored/localStore";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useVerifyAcsessToken() {  
  const { verifyAcessToken } = UseAuth();
  const token = getAccessToken();
  
  return useQuery({
    queryKey: ["verify-access-token"],
    queryFn: verifyAcessToken,
    staleTime: Infinity,    
    enabled: !!token,
  });
}

export function useSignIn() {
  const { signIn } = UseAuth();
  return useMutation({
    mutationKey: ["signIn"],
    mutationFn: async ({ email, password }: ISignInPayload) =>
      await signIn({ email, password }),
  });
}

export function useSignOut() {
  const { signOut } = UseAuth();
  return useMutation({
    mutationKey: ["signOut"],
    mutationFn: async () => await signOut(),
  });
}

export function useSignUp() {
  const { signUp } = UseAuth();
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: async ({name, email, password }: ISignUpPayload) =>
      await signUp({name, email, password }),
  });
}