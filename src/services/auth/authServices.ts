import axios from "axios";
import { api } from "../api/api";
import { removeAccessToken, saveAccessToken } from "@/lib/utils";
import { ISignInPayload } from "@/types/authTypes";

export const signUpRequest = async () => {
  const response = await api.post("/auth/sign-up");
  return response.data;
};

export const signInRequest = async ({ email, password }: ISignInPayload) => {
  const response = await api.post("/auth/sign-in", { email, password });
  return response.data;
};

export const signOutRequest = async () => {
  const response = await api.post("/auth/sign-out");
  return response.data;
};

export const verifyAcsessTokenResquest = async () => {
  try {
    const response = await api.post("/auth/verify-acsess-token");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      removeAccessToken();
    }
    throw error;
  }
};

export const refreshTokenRequest = async () => {
  try {
    const response = await api.post("/auth/refresh-token");
    saveAccessToken(response.data.accessToken);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      removeAccessToken();
    }
    throw error;
  }
};
