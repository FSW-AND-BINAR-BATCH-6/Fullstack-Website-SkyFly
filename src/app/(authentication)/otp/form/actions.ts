"use server";

import axios from "axios";

interface OtpData {
  otp: string;
  token: string;
}

interface ResendOtpData {
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
    console.log(error);
  }
};

export const ResendOtp = async (data: ResendOtpData) => {
  try {
    const response = await axios.post(
      `https://backend-skyfly-c1.vercel.app/api/v1/auth/verified/resend-otp?token=${data.token}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
