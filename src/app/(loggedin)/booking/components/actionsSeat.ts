"use server";

import axios from "axios";

export interface SeatById {
  flightId: string; //"clxelwz45001khwic2yt2z501"
  id: string; //"clxelx0zb00hxhwicr5376ts1"
  price: number; //1200000
  seatNumber: string; //"1A"
  status: string; //"available"
  type: string; //"ECONOMY"
}

export const seatByFlightId = async (
  id: string
): Promise<SeatById> => {
  try {
    const response = await axios.get(
      `https://backend-skyfly-c1.vercel.app/api/v1/flightSeats/flight/${id}`
    );

    const seat = response.data.data;

    return seat;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
