"use server";

import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post("/api/login", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors
      console.error("Axios error:", error.response?.data);
      throw new Error(
        error.response?.data.message ||
          "An error occurred while logging in"
      );
    } else {
      // Handle other errors
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
