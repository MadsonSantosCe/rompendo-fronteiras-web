import axios from "axios";
import { env } from "@/config/env";
import { getAccessToken } from "@/utils/stored/localStore";

const base_URL = env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: base_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default api;
