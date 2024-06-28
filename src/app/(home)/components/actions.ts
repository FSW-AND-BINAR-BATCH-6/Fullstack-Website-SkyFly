"use server";

import axios from "axios";

export interface Plane {
  name: string;
  code: string;
  image: string;
  terminal: string;
}

export interface Airport {
  id: string;
  name: string;
  code: string;
  country: string;
  city: string;
  continent: string;
  image: string;
}

export interface Transit {
  status: boolean;
}

export interface ClassInfo {
  seatClass: string;
  seatPrice: number | null;
}

export interface PriceRange {
  minPrice: string | null;
  maxPrice: string | null;
}

export interface PriceRanges {
  BUSINESS: PriceRange;
  FIRST: PriceRange;
  ECONOMY: PriceRange;
}

export interface Pagination {
  totalPages: number;
  currentPage: number;
  pageItems: number;
  nextPage: number;
  prevPage: number;
}

export interface Flight {
  id: string;
  planeId: string;
  plane: Plane;
  departureDate: string;
  departureTime: string;
  code: string;
  departureAirport: Airport;
  transit: Transit;
  arrivalDate: string;
  arrivalTime: string;
  destinationAirport: Airport;
  capacity: number;
  discount: number | null;
  price: number;
  facilities: string | null;
  duration: string;
  classInfo: ClassInfo[];
}

export interface ApiResponse {
  status: boolean;
  message: string;
  totalItems: number;
  pagination: Pagination;
  priceRanges: PriceRanges;
  data: Flight[];
}

export const getFlights = async (
  page: number
): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      `https://backend-skyfly-c1.vercel.app/api/v1/flights?page=${page}`
    );

    const flights: ApiResponse = response.data;
    return flights;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getFlightsReset = async (): Promise<ApiResponse> => {
  try {
    const baseURL = `https://backend-skyfly-c1.vercel.app/api/v1/flights`;
    const response = await axios.get(baseURL);
    const flights: ApiResponse = response.data;
    return flights;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
