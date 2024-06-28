"use server";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface OtpData {
  otp: string;
  token: string;
}

interface ResendOtpData {
  token: string;
}

interface OtpWithSmsData {
  phoneNumber: string;
  token: string;
}

export const OtpData = async (data: OtpData) => {
  try {
    const response = await axios.put(
      `https://backend-skyfly-c1.vercel.app/api/v1/auth/verified?token=${data.token}`,
      { otp: data.otp }
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

export const ResendOtp = async (data: ResendOtpData) => {
  try {
    const response = await axios.post(
      `https://backend-skyfly-c1.vercel.app/api/v1/auth/verified/resend-otp?token=${data.token}`
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

export const OtpWithSms = async (data: OtpWithSmsData) => {
  try {
    const response = await axios.post(
      `https://backend-skyfly-c1.vercel.app/api/v1/auth/verified/resendSMS-otp?token=${data.token}`,
      { phoneNumber: data.phoneNumber }
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

export const getUserEmail = async (token: string): Promise<any> => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    console.error("Error decoding token:", err);
    throw err;
  }
};
