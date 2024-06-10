"use server";

import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(
      "https://backend-skyfly-c1.vercel.app/api/v1/auth/login",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
