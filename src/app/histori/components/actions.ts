"use server";

import axios from "axios";

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

export interface Airport {
  id: string;
  name: string;
  code: string;
  country: string;
  city: string;
}

export interface getTransaction {
  token: string;
}

export interface getTransactionById {
  token: string;
  transactionId: string | unknown;
}

export interface Airline {
  id: string;
  code: string;
  name: string;
  image: string;
  terminal: string;
}

export interface Airport {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  continent: string;
  image: string;
}

export interface Flight {
  id: string;
  code: string;
  departure: {
    date: string;
    time: string;
  };
  arrival: {
    date: string;
    time: string;
  };
  flightPrice: number;
  flightDuration: string;
  airline: Airline;
  departureAirport: Airport;
  destinationAirport: Airport;
}

export interface Seat {
  id: string;
  flightId: string;
  seatNumber: string;
  status: string;
  type: string;
  seatPrice: number;
}

export interface TransactionDetail {
  id: string;
  transactionId: string;
  totalPrice: number;
  name: string;
  passengerCategory: string;
  familyName: string;
  dob: string;
  citizenship: string;
  passport: string;
  issuingCountry: string;
  validityPeriod: string;
  flight: Flight;
  seat: Seat;
}

export interface Booking {
  date: string;
  time: string;
  code: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  userId: string;
  tax: number;
  totalPrice: number;
  status: string;
  booking: Booking;
  Transaction_Detail: TransactionDetail[];
}

export interface TransactionDate {
  date: string;
  transactions: Transaction[];
}

export interface Pagination {
  totalPage: number;
  currentPage: number;
  pageItems: number;
  nextPage: string | null;
  prevPage: string | null;
}

export interface Response {
  status: boolean;
  message: string;
  totalItems: number;
  pagination: Pagination;
  data: TransactionDate[];
}

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

export const getAllTransactions = async (
  data: getTransaction
): Promise<TransactionDate[]> => {
  try {
    const response = await axios.get<Response>(
      `https://backend-skyfly-c1.vercel.app/api/v1/transactions`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    return response.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getTransactionById = async (
  data: getTransactionById
): Promise<TransactionDate[]> => {
  try {
    const response = await axios.get<Response>(
      `https://backend-skyfly-c1.vercel.app/api/v1/transactions/${data.transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
