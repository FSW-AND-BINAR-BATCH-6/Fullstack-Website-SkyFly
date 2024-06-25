"use server";

import axios from "axios";

export const seatByFlightId = async (id: string) => {
  try {
    const response = await axios.get(
      `https://backend-skyfly-c1.vercel.app/api/v1/flightSeats/flight/${id}?limit=72`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
