import { env } from "@/config/env";
import { getAccessToken } from "@/lib/utils";
import { useAuthStore } from "@/lib/zustand/authStore";
import axios from "axios";

const base_URL = env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: base_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken(); 
 
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Response =', response);
    return response;
  },
  async (error) => {
    console.log('error =', error);

    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        await refreshToken();
        return api(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);