import axios from "axios";

const base_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: base_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);