
import axios from "axios";
import { refreshTokenRequest, signInRequest, signOutRequest, signUpRequest } from "@/services/auth/authServices";
import { create } from "zustand";
import { toast } from "sonner";

interface User {
	id: string;
	email: string;
	name: string;    
}

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	error: string | null;
	isLoading: boolean;
	isCheckingAuth: boolean;
	message: string | null;
}

interface AuthActions {
	signup: (email: string, password: string, name: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	verifyEmail: (code: string) => Promise<void>;
	forgotPassword: (email: string) => Promise<void>;
	resetPassword: (token: string, password: string) => Promise<void>;    
	refreshToken: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

	signup: async (email, password, name) => {
		set({ isLoading: true, error: null, message: null });
		try {
			const response = await signUpRequest({ email, password, name }) ;
			set({ user: response.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			if (axios.isAxiosError(error)) {
                set({ error: error.response?.data.message || error.message, isLoading: false });
                toast.error(`Erro: ${error.response?.data.message || error.message}`);
            } else {
                set({ error: "Occoreu um erro inesperado", isLoading: false });
                toast.error(`Erro: ${error}`);
            }
		}
	},

	signIn: async (email, password) => {
		set({ isLoading: true, error: null, message: null });
		try {
			const response = await signInRequest({ email, password });
			set({
				isAuthenticated: true,
				user: response.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			if (axios.isAxiosError(error)) {
                set({ error: error.response?.data.message || error.message, isLoading: false });
                toast.error(`Erro: ${error.response?.data.message || error.message}`);
            } else {
                set({ error: "Occoreu um erro inesperado", isLoading: false });
                toast.error(`Erro: ${error}`);
            }
		}
	},

	signOut: async () => {
		set({ isLoading: true, error: null, message: null });
		try {
			await signOutRequest();
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			if (axios.isAxiosError(error)) {
                set({ error: error.response?.data.message || error.message, isLoading: false });
                toast.error(`Erro: ${error.response?.data.message || error.message}`);
            } else {
                set({ error: "Occoreu um erro inesperado", isLoading: false });
                toast.error(`Erro: ${error}`);
            }
		}
	},

	verifyEmail: async (code) => {
		set({ isLoading: true, error: null, message: null });
		try {
			const response = await axios.post<{ user: User; message: string }>(`/verify-email`, { code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false, message: response.data.message });
		} catch (error) {
			if (axios.isAxiosError(error)) {
				set({ error: error.response?.data.message || error.message, isLoading: false });
				toast.error(`Erro: ${error.response?.data.message || error.message}`);
			} else {
				set({ error: "Occoreu um erro inesperado", isLoading: false });
				toast.error(`Erro: ${error}`);
			}
		}
	},

	forgotPassword: async (email) => {
		set({ isLoading: true, error: null, message: null });
		try {
			const response = await axios.post<{ message: string }>(`/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			if (axios.isAxiosError(error)) {
                set({ error: error.response?.data.message || error.message, isLoading: false });
                toast.error(`Erro: ${error.response?.data.message || error.message}`);
            } else {
                set({ error: "Occoreu um erro inesperado", isLoading: false });
                toast.error(`Erro: ${error}`);
            }
		}
	},

	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null, message: null });
		try {
			const response = await axios.post<{ message: string }>(`/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			if (axios.isAxiosError(error)) {
                set({ error: error.response?.data.message || error.message, isLoading: false });
                toast.error(`Erro: ${error.response?.data.message || error.message}`);
            } else {
                set({ error: "Occoreu um erro inesperado", isLoading: false });
                toast.error(`Erro: ${error}`);
            }
		}
	},
    
	refreshToken: async () => {
		set({ isCheckingAuth: true, error: null, message: null });
		try {
			const response = await refreshTokenRequest();
			set({ user: response.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			if (axios.isAxiosError(error)) {
                set({ error: error.response?.data.message || error.message, isLoading: false });
                toast.error(`Erro: ${error.response?.data.message || error.message}`);
            } else {
                set({ error: "Occoreu um erro inesperado", isLoading: false });
                toast.error(`Erro: ${error}`);
            }
		}
	},
}));