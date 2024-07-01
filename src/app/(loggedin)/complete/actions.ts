"use server";

import axios from "axios";

export const showTicket = async () => {
  try {
    const response = await axios.get(
      "https://backend-skyfly-c1.vercel.app/api/v1/tickets/generate?ticketTransactionId=cly1df3210002vwkyov1wx3i6",
      {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMDUzMzcxODg2NjQ4ODAzOTI3OCIsIm5hbWUiOiJSZWluYW5kYSBGYXJpcyIsImVtYWlsIjoicmF5bmFuZGFmYXJpc0BnbWFpbC5jb20iLCJwaG9uZU51bWJlciI6bnVsbCwicm9sZSI6IkJVWUVSIiwiaWF0IjoxNzE5NzYzMTQ1LCJleHAiOjE3MTk4NDk1NDV9.DLdsxtoauUSG9ddBZG9OsQkaMYquaz3wjIGMxAqxYsM`,
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
