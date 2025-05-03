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
  const [data, setData] = useState<IAuthState>({
    user: null,
    token: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await mutateAsync();
        setData({ user: response.user, token: response.token });
      } catch (err) {
        console.log("Erro ao tentar restaurar sessão:", err);
        setData({ user: null, token: null });
      }
    };

    loadUser();
  }, []);

  const setAuthData = useCallback(
    ({ token, user }: { token: string; user: IUser }) => {
      setData({ user, token });
    },
    []
  );

  const removeAuthData = useCallback(() => {
    setData({ user: null, token: null });
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
