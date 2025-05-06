import { env } from "@/config/env";
import axios from "axios";

const base_URL = env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: base_URL,
  withCredentials: true,
});

export const setAuthorizationToken = (token: string) => {
  api.interceptors.request.use(
    (config) => {
      config.headers.set('authorization', `Bearer ${token}`);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
