"use server";

import axios from "axios";

export const showTicket = async () => {
  try {
    const response = await axios.get(
      "https://backend-skyfly-c1.vercel.app/api/v1/tickets/generate",
      {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjZDFkZjVkLWI2ZGYtNGJmZi04MTFlLTBiMDdjZDViYzA4NyIsIm5hbWUiOiJ5dWdpIiwiZW1haWwiOiJ5dWdpQGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiKzYyODk1MTQzNDI2NjUiLCJyb2xlIjoiQlVZRVIiLCJpYXQiOjE3MTg5NjQxOTksImV4cCI6MTcxOTA1MDU5OX0.60M65tL4BEqpCaBpIun3aDJYHvVpdA8BAQTdR8nNaXo`,
        },
        responseType: "document", // Ensure the response is treated as a document
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
