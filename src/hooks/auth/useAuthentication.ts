import { UseAuth } from "@/contexts/auth/authProvider";
import { ISignInPayload, ISignUpPayload } from "@/types/authTypes";
import { getAccessToken } from "@/utils/storage/localStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["signIn"],
    mutationFn: (payload: ISignInPayload) => signIn(payload),
    onSuccess: () => {
      toast.success("Login realizado com sucesso!");
      navigate("/");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Erro ao fazer login.";
      toast.error(message);
    },
  });
}

export function useSignOut() {
  const { signOut } = UseAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["signOut"],
    mutationFn: () => signOut(),
    onSuccess: () => {
      toast.success("Logout realizado com sucesso!");
      navigate("/login");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Erro ao fazer logout.";
      toast.error(message);
    },
  });
}

export function useSignUp() {
  const { signUp } = UseAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: (payload: ISignUpPayload) => signUp(payload),
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso!");
      navigate("/verify-email");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Erro ao criar conta.";
      toast.error(message);
    },
  });
}
