import { ISignInPayload, ISignUpPayload } from "@/types/authTypes";
import { getAccessToken } from "@/utils/storage/localStorage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/authContext";
import axios from "axios";

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
        axios.isAxiosError(error) ? error.response?.data.message : "Erro ao fazer login."; 
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
        axios.isAxiosError(error) ? error.response?.data.message : "Erro ao fazer logout.";
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
        axios.isAxiosError(error) ? error.response?.data.message  : "Erro ao criar conta.";
      toast.error(message);
    },
  });
}

export function useVerifyEmail() {
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["verifyEmail"],
    mutationFn: (code: string) => verifyEmail(code),
    onSuccess: () => {
      toast.success("Email verificado com sucesso!");
      navigate("/");
    },
    onError: (error: unknown) => {
      const message =
        axios.isAxiosError(error) ? error.response?.data.message : "Erro ao verificar email.";
      toast.error(message);
    },
  });
}

export function useForgotPassword() {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: () => {
      toast.success("Email enviado com sucesso!");
      navigate("/login");
      },
    onError: (error: unknown) => {
      const message =
        axios.isAxiosError(error) ? error.response?.data.message : "Erro ao enviar email.";
      toast.error(message);
    },
  });
}

export function useResetPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (payload: { password: string; token: string }) => 
      resetPassword(payload),
    onSuccess: () => {
      toast.success("Senha alterada com sucesso!");
      navigate("/login");
    },
    onError: (error: unknown) => {
      const message =
        axios.isAxiosError(error) ? error.response?.data.message : "Erro ao enviar email.";
      toast.error(message);
    },
  });
}

