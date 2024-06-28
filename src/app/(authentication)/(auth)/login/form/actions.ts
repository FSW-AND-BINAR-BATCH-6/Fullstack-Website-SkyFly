"use server";

import axios from "axios";

export interface LoginData {
  email: string;
  password: string;
}

interface ForgotPassword {
  email: string;
}

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(
      "https://backend-skyfly-c1.vercel.app/api/v1/auth/login",
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: false,
        message: error.response?.data?.message || error.message,
      };
    } else {
      return {
        status: false,
        message: "An unexpected error occurred",
      };
    }
  }
};

export const forgotPassword = async (data: ForgotPassword) => {
  try {
    const response = await axios.post(
      "https://backend-skyfly-c1.vercel.app/api/v1/auth/forgetPassword",
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: false,
        message: error.response?.data?.message || error.message,
      };
    } else {
      return {
        status: false,
        message: "An unexpected error occurred",
      };
    }
  }
};
