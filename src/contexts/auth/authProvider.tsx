import { useState, useCallback, useMemo, type ReactNode } from "react";
import axios, { AxiosResponse } from "axios";
import api from "@/services/api/api";
import { ISignInPayload, ISignUpPayload, IUser } from "@/types/authTypes";
import { clearToken, setToken } from "@/utils/storage/localStorage";
import { AuthContext } from "./authContext";

type AuthProviderProps = {
  children: ReactNode;
};

export interface IAuthContext {
  user: IUser | null;
  signIn: (payload: ISignInPayload) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (payload: ISignUpPayload) => Promise<void>;  
  verifyEmail: (email: string) => Promise<void>;
  verifyAcessToken: () => Promise<AxiosResponse>;
  forgotPassword: (email: string) => Promise<void>;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);

  const signIn = useCallback(async ({ email, password }: ISignInPayload) => {
    const response = await api.post("/auth/sign-in", { email, password });
    setUser(response.data.user);
    setToken(response.data.accessToken);
  }, []);

  const signOut = useCallback(async () => {
    await api.post("/auth/sign-out");
    clearToken();
    setUser(null);
  }, []);

  const signUp = useCallback(async ({ name, email, password }: ISignUpPayload) => {
    const response = await api.post("/auth/sign-up", { name, email, password });
    setUser(response.data.user);
  }, []);  

  const verifyEmail = useCallback(async (code: string) => {
      const response = await api.post("/auth/verify-email", { code });
      setUser(response.data.user);
      setToken(response.data.accessToken);
      return response.data;
  }, []);

  const verifyAcessToken = useCallback(async () => {
    try {
      const response = await api.post("/auth/verify-acsess-token");
      setUser(response.data.user);
      return response;
    } catch (error) {
      setUser(null);
      clearToken();
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error(error.response?.data);
      }
      throw error;
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  }, []);

  const contextValues = useMemo(() => ({
    user,
    signIn,
    signOut,
    signUp,
    verifyEmail,
    verifyAcessToken,
    forgotPassword,    
  }), [user, signIn, signOut, signUp, verifyEmail, verifyAcessToken, forgotPassword]);

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
