"use server";

import axios from "axios";

interface BookingData {
  bookingDetails: string;
  token: string;
  orderer: {
    fullName: string;
    familyName?: string;
    phoneNumber: string;
    email: string;
  };
  passengers: {
    title: string;
    fullName: string;
    familyName?: string;
    dob: string;
    citizenship: string;
    passport: string;
    issuingCountry: string;
    validityPeriod: string;
  };
  selectedSeats: string[];
}

export const bookingUser = async (data: BookingData) => {
  try {
    const response = await axios.post(
      `https://backend-skyfly-c1.vercel.app/api/v1/transactions/payment?flightId=${data.bookingDetails}`,
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
