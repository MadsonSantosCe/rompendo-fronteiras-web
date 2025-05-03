import axios from "axios";

const base_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: base_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
