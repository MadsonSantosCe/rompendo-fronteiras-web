import { api } from "@/services/api/api";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface IUser {
  id: string;
  email: string;
  name: string;
}

interface IAuthState {
  token: string | null;
  user: IUser;
}

interface IResponseAuth {
  message: string;
  token: string;
  user: IUser;
}

interface IAuthContext extends IAuthState {
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  signOut: () => void;
}

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

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await api.post("/auth/sign-in", {
          email,
          password,
        });

        const { token, user } = response.data as IResponseAuth;
        setData({ token, user });
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/");
        return user;
      } catch (error) {
        console.error(error);
      }
    },
    [navigate]
  );

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const response = await api.post("/auth/sign-up", {
          name,
          email,
          password,
        });

        const { token, user } = response.data as IResponseAuth;
        setData({ token, user });
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        return user;
      } catch (error) {
        console.error(error);
      }
    },
    [navigate]
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function UseAuthentication(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "UseAuthentication precisa deve ser usado dentro de AuthProvider"
    );
  }

  return context;
}

export { AuthProvider, UseAuthentication };
