"use server";

import axios from "axios";

export interface Airline {
  id: string;
  name: string;
  code: string;
}

export interface Airport {
  id: string;
  name: string;
  code: string;
  country: string;
  city: string;
}

export interface Flight {
  id: string;
  planeId: string;
  departureDate: string;
  code: string;
  departureAirport: Airport;
  transit: null | string;
  arrivalDate: string;
  destinationAirport: Airport;
  capacity: number;
  discount: null | number;
  price: number;
  facilities: null | string;
}

export interface FlightById {
  id: string;
  planeId: string;
  departureDate: string;
  code: string;
  departureAirport: Airport;
  transit: null | string;
  arrivalDate: string;
  destinationAirport: Airport;
  capacity: number;
  discount: null | number;
  price: number;
  facilities: null | string;
}

export const getFlights = async (): Promise<Flight[]> => {
  try {
    const response = await axios.get(
      "https://backend-skyfly-c1.vercel.app/api/v1/flights"
    );

    const flights = response.data.data;

    return flights;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getFlightById = async (
  id: string
): Promise<FlightById> => {
  try {
    const response = await axios.get(
      `https://backend-skyfly-c1.vercel.app/api/v1/flights/${id}`
    );

    const flight = response.data.data;

    return flight;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAirlines = async (): Promise<Airline[]> => {
  try {
    const response = await axios.get(
      "https://backend-skyfly-c1.vercel.app/api/v1/airlines"
    );

    const airlines = response.data.data;

    return airlines;
  } catch (err) {
    console.log(err);
    throw err;
  }
};