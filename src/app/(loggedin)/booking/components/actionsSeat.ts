"use server";

import axios from "axios";

export interface SeatById {
  flightId: string;
  id: string;
  price: number;
  seatNumber: string;
  status: string;
  type: string;
}

export const seatByFlightId = async (
  id: string
): Promise<SeatById> => {
  try {
    const response = await axios.get(
      `https://backend-skyfly-c1.vercel.app/api/v1/flightSeats/flight/${id}?limit=72`
    );

    const seat = response.data.data;

    return seat;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
