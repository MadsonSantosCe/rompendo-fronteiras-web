import { UseAuthentication } from "@/context/auth/authProvider";
import { signInRequest, signUpRequest } from "@/services/auth/authServices";
import { ISignInPayload, ISignUpPayload } from "@/types/authTypes";
import { useMutation } from "@tanstack/react-query";

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
