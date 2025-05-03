import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  useSignIn,
  useSignUp,
  signOut as signOutService,
} from "@/services/auth/authServices";
import { IUser } from "@/types/authTypes";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface IAuthState {
  token: string | null;
  user: IUser;
}

interface IAuthContext extends IAuthState {
  signIn: (email: string, password: string) => Promise<IUser | void>;
  signUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<IUser | void>;
  signOut: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      return {} as IAuthState;
    }

    return {
      token,
      user: JSON.parse(user),
    };
  });

  const { mutateAsync: signInMutation } = useSignIn();
  const { mutateAsync: signUpMutation } = useSignUp();

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const { token, user } = await signInMutation({ email, password });
        setData({ token, user });
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        return user;
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    },
    [signInMutation, navigate]
  );

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const { token, user } = await signUpMutation({ name, email, password });
        setData({ token, user });
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        return user;
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
      }
    },
    [signUpMutation, navigate]
  );

  const signOut = useCallback(() => {
    signOutService();
    setData({} as IAuthState);
    navigate("/login");
  }, [navigate]);

  const contextValue = useMemo(
    () => ({
      ...data,
      signIn,
      signUp,
      signOut,
    }),
    [data, signIn, signUp, signOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

function UseAuthentication(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "UseAuthentication precisa ser usado dentro de AuthProvider"
    );
  }

  return context;
}

export { AuthProvider, UseAuthentication };
