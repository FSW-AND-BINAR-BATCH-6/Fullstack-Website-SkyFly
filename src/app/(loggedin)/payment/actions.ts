"use server";

import axios from "axios";

export interface PaymentData {
  token: string;
  orderer: {
    familyName: string;
    phoneNumber: string;
    fullName: string;
    email: string;
  };
  passengers: {
    title: string;
    fullName: string;
    dob: string;
    validityPeriod: string;
    familyName: string;
    citizenship: string;
    passport: string;
    issuingCountry: string;
  }[];
}

export const paymentGopay = async (data: PaymentData) => {
  try {
    const response = await axios.post(
      `https://backend-skyfly-c1.vercel.app/api/v1/transactions/gopay?flightId=clxkt98yw000njnepyaschw9t&adult=1&child=0&baby=0`,
      data,
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
