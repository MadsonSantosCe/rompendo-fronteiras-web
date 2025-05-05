import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IUser } from "@/types/authTypes";
import { useRefreshToken } from "@/hooks/auth/useAuth";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface IAuthState {
  token: string | null;
  user: IUser | null;
}

interface IAuthContext extends IAuthState {
  setAuthData: (data: { token: string; user: IUser }) => void;
  removeAuthData: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: AuthProviderProps) {
  const { mutateAsync } = useRefreshToken();
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  });

  const refreshToken = async () => {
    try {
      const response = await mutateAsync();
      setAuthData({
        token: response.token,
        user: response.user,
      });
    } catch (err) {
      console.log("Erro ao tentar restaurar sessão:", err);
      removeAuthData();
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  const setAuthData = useCallback(
    ({ token, user }: { token: string; user: IUser }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setData({ token, user });
    },
    []
  );

  const removeAuthData = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setData({ token: null, user: null });
  }, []);

  const contextValue = useMemo(
    () => ({
      ...data,
      setAuthData,
      removeAuthData,
    }),
    [data, setAuthData, removeAuthData]
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
