import { createContext } from "react";
import type { IAuthContext } from "@/types/authTypes";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
