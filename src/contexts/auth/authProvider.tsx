import {
  createContext,
  useCallback,
  useMemo,
  useContext,
  type ReactNode,
  useState,
} from "react";
import axios, { type AxiosResponse } from "axios";
import { removeAccessToken, saveAccessToken } from "@/utils/storage/localStore";
import api from "@/services/api/api";
import { ISignInPayload, ISignUpPayload } from "@/types/authTypes";
import { toast } from "sonner";

type authProviderPromps = {
  children: ReactNode;
};

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IAuthContext {
  user: IUser | null;
  signIn: (payload: ISignInPayload) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (payload: ISignUpPayload) => Promise<void>;
  verifyAcessToken: () => Promise<AxiosResponse>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: authProviderPromps) {
  const [user, setUser] = useState<IUser | null>(null);

  const signIn = useCallback(async ({ email, password }: ISignInPayload) => {
    try {
      const response = await api.post("/auth/sign-in", { email, password });
      setUser(response.data.user);
      saveAccessToken(response.data.accessToken);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data);
      }
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await api.post("/auth/sign-out");
      removeAccessToken();
      setUser(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data);
      }
    }
  }, []);

  const signUp = useCallback(
    async ({ name, email, password }: ISignUpPayload) => {
      try {
        const response = await api.post("/auth/sign-up", {
          name,
          email,
          password,
        });
        setUser(response.data.user);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data);
        }
      }
    },
    []
  );

  const verifyAcessToken = useCallback(async () => {
    try {
      const response = await api.post("/auth/verify-acsess-token");
      setUser(response.data.user);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error(error.response?.data);
      }
      throw error;
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const response = await api.post("/auth/refresh-token");
      setUser(response.data.user);
      saveAccessToken(response.data.accessToken);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        removeAccessToken();
        setUser(null);
        toast.error("Sessão expirada, faça login novamente");
      }
    }
  }, []);

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/auth/refresh-token")
      ) {
        originalRequest._retry = true;
        try {
          await refreshToken();
          return api(originalRequest);
        } catch (refreshError) {
          signOut();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  const contextValues = useMemo(
    () => ({
      user,
      signIn,
      signOut,
      signUp,
      verifyAcessToken,
    }),
    [user, signIn, signOut, signUp, verifyAcessToken]
  );

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
}

function UseAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, UseAuth };
