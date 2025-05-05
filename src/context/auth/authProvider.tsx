import Cookies from "js-cookie";
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
import { setAuthToken } from "@/services/api/api";

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
    const token = Cookies.get("token");
    const user = Cookies.get("user");

    if (!token || !user) {
      return { token: null, user: null };
    }

    return {
      token,
      user: JSON.parse(user),
    };
  });

  const setAuthData = useCallback(
    ({ token, user }: { token: string; user: IUser }) => {
      Cookies.set("token", token, { expires: 7 }); // 7 dias
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
      setAuthToken(token);
      setData({ token, user });
    },
    []
  );

  const removeAuthData = useCallback(() => {
    Cookies.remove("token");
    Cookies.remove("user");
    setData({ token: null, user: null });
  }, []);

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
    if (data.token) {
      refreshToken();
    }
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
