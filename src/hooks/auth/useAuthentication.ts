import { ISignInPayload, ISignUpPayload } from "@/types/authTypes";
import { getAccessToken } from "@/utils/storage/localStorage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/authContext";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export function useVerifyAcsessToken() {
  const { verifyAcessToken } = useAuth();
  const token = getAccessToken();

  return useQuery({
    queryKey: ["verify-access-token"],
    queryFn: verifyAcessToken,
    staleTime: Infinity,
    enabled: !!token,
    retry: false,
  });
}
export function useSignIn() {
  const { signIn } = useAuth();
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
  const { signOut } = useAuth();
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
  const { signUp } = useAuth();
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
