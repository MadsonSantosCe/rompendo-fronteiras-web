// AuthProvider.tsx
import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
  } from "react";
  import { IUser } from "@/types/authTypes";
  interface AuthProviderProps {
    children: React.ReactNode;
  }
  
  interface IAuthState {
    token: string | null;
    user: IUser | null;
  }
  
  interface IAuthContext extends IAuthState {
    setAuthData: (data: { token: string; user: IUser }) => void;
  }
  
  const AuthContext = createContext<IAuthContext>({} as IAuthContext);
  
  function AuthProvider({ children }: AuthProviderProps) {
  
    const [data, setData] = useState<IAuthState>(() => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
  
      return {
        token: token || null,
        user: user ? JSON.parse(user) : null,
      };
    });
  
    const setAuthData = useCallback(({ token, user }: { token: string; user: IUser }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setData({ token, user });
    }, []);
  
    const contextValue = useMemo(
      () => ({
        ...data,
        setAuthData,
      }),
      [data, setAuthData]
    );
  
    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  function UseAuthentication(): IAuthContext {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("UseAuthentication precisa ser usado dentro de AuthProvider");
    }
    return context;
  }
  
  export { AuthProvider, UseAuthentication };
  