"use server";

import axios from "axios";

interface Airport {
  id: string;
  name: string;
  code: string;
  country: string;
  city: string;
}

export const getAirports = async (): Promise<string[]> => {
  try {
    const response = await axios.get(
      "https://backend-skyfly-c1.vercel.app/api/v1/airports"
    );

    const cities = response.data.data.flatMap((airport: Airport) => [
      airport.city,
    ]);

    const uniqueCities = Array.from(new Set<string>(cities));

    return uniqueCities;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
