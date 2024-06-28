"use server";

import axios from "axios";

interface PasswordReset {
  password: string;
  confirmPassword: string;
  token: string;
}

export const passwordReset = async (data: PasswordReset) => {
  try {
    const response = await axios.put(
      `https://backend-skyfly-c1.vercel.app/api/v1/auth/resetPassword?token=${data.token}`,
      {
        password: data.password,
        confirmPassword: data.confirmPassword,
      }
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
