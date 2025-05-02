import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";

type AppContextProps = {
    children: ReactNode
  }

export function AppcontextProvider({ children }: AppContextProps) {
  return <AuthProvider>{children}</AuthProvider>;
}