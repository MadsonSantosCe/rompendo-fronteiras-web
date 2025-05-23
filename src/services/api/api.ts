import axios from "axios";
import { env } from "@/config/env";
import {
  getAccessToken,
  setToken,
  clearToken,
} from "@/utils/storage/localStorage";

const base_URL = env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: base_URL,
  withCredentials: true,
});

// Interceptador de Requisição: Injeta o Token de Acesso
api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptador de Resposta: Lida com Erros 401 e Refresh de Token
let isRefreshing = false;
interface FailedQueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

let failedQueue: FailedQueueItem[] = [];

interface ProcessQueueError {
  message?: string;
}

type Token = string | null;

interface FailedQueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

const processQueue = (
  error: ProcessQueueError | null,
  token: Token = null
): void => {
  failedQueue.forEach((prom: FailedQueueItem) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const isTokenExpired =
      error.response?.status === 401 &&
      (error.response?.data?.message === "Token expirado");

    if (
      isTokenExpired &&
      originalRequest.url !== "/auth/refresh-token"
    ) {
      
      if (isRefreshing) {        
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);             
          })
          .catch((err) => {
            return Promise.reject(err); 
          });
      }

      originalRequest._retry = true; 
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${api.defaults.baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const { accessToken: accessToken } = response.data; 

        setToken(accessToken);
        
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        processQueue(null, accessToken);       
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Falha ao atualizar o token:", refreshError);
        clearToken();
        window.location.href = "/login";
        processQueue(refreshError as ProcessQueueError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
