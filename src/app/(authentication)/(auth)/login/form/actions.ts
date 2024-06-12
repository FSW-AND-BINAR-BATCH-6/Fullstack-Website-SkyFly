"use server";

import { UseApi } from "@/hooks/useApi";

interface LoginData {
  email: string;
  password: string;
}

interface ForgotPassword {
  email: string;
}

export const loginUser = async (data: LoginData) => {
  return await UseApi<LoginData>(
    "post",
    "https://backend-skyfly-c1.vercel.app/api/v1/auth/login",
    data
  );
};

export const forgotPassword = async (data: ForgotPassword) => {
  return await UseApi<ForgotPassword>(
    "post",
    "https://backend-skyfly-c1.vercel.app/api/v1/auth/forgetPassword",
    data
  );
};
