"use server";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DataUser {
  token: string;
  name: string;
  familyName?: string | undefined;
  phoneNumber: string;
}

interface PasswordReset {
  password: string;
  confirmPassword: string;
  token: string;
}

export const getUserName = async (token: string): Promise<any> => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    console.error("Error decoding token:", err);
    throw err;
  }
};

export const editProfile = async (data: DataUser) => {
  try {
    const response = await axios.patch(
      `https://backend-skyfly-c1.vercel.app/api/v1/auth/me`,
      {
        name: data.name,
        familyName: data.familyName,
        phoneNumber: data.phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
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

export const passwordReset = async (data: PasswordReset) => {
  try {
    const response = await axios.patch(
      `https://backend-skyfly-c1.vercel.app/api/v1/auth/me`,
      {
        password: data.password,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
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
