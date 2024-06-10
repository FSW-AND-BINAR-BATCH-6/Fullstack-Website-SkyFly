"use server";

import axios from "axios";

interface RegisterData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(
      "https://backend-skyfly-c1.vercel.app/api/v1/auth/register",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
