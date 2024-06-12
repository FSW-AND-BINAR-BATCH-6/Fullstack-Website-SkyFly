"use server";

import axios from "axios";

interface ApiResponse<T> {
  status: boolean;
  message?: string;
  data?: T;
  _token?: string;
}

const useApi = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });

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

export default useApi;
