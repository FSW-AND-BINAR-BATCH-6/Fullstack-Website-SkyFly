"use server";

import { jwtDecode } from "jwt-decode";

export const getUserName = async (token: string): Promise<any> => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    console.error("Error decoding token:", err);
    throw err;
  }
};
