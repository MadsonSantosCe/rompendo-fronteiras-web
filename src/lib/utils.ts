import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const saveAccessToken = (token: string) => {
	localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
	return localStorage.getItem("accessToken");
};

export const removeAccessToken = () => {
	localStorage.removeItem("accessToken");
};
