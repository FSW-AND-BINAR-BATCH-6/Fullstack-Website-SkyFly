"use server";

import axios from "axios";

interface PasswordReset {
  password: string;
  confirmPassword: string;
}

export const passwordReset = async (data: PasswordReset) => {
  try {
    const response = await axios.put(
      `https://backend-skyfly-c1.vercel.app/api/v1/auth/resetPassword?token=`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
