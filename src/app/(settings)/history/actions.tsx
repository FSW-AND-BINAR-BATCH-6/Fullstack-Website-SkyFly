import axios from "axios";

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

export interface Seat {
  id: string;
  flightId: string;
  seatNumber: string;
  status: string;
  type: string;
  seatPrice: number;
}

export interface Transaction {
  id: string;
  orderId: string;
  userId: string;
  tax: number;
  totalPrice: number;
  status: string;
  booking: {
    date: string;
    time: string;
    code: string;
  };
  Transaction_Detail: TransactionDetail[];
}

export interface Data {
  date: string;
  transactions: Transaction[];
}

export interface Pagination {
  totalPage: number;
  currentPage: number;
  pageItems: number;
  nextPage: number | null;
  prevPage: number | null;
}

export interface Response {
  status: boolean;
  message: string;
  totalItems: number;
  pagination: Pagination;
  data: Data[];
  date: string;
  transactions: Transaction[];
}

export interface StatusTransaction {
  transaction_status: string;
  payment_status: string;
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  currency: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  expiry_time: string;
  signature_key: string;
  va_numbers: VirtualAccount[];
}

export interface VirtualAccount {
  bank: string;
  va_number: string;
}

export const getTransaction = async (token: string): Promise<Data[]> => {
  try {
    const response = await axios.get(
      `https://backend-skyfly-c1.vercel.app/api/v1/transactions?limit=5000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export const cancelPayment = async (token: string, orderId: string) => {
  try {
    const response = await axios.post(
      `https://backend-skyfly-c1.vercel.app/api/v1/transactions/cancel/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

export const handleContinuePayment = async (token: string, orderId: string) => {
  try {
    const response = await axios.get(
      `https://backend-skyfly-c1.vercel.app/api/v1/transactions/status/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data.va_numbers;
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

export const PrintTicket = async (token: string, transactionId: string) => {
  try {
    const response = await axios.get(
      `https://backend-skyfly-c1.vercel.app/api/v1/tickets/generate?ticketTransactionId=${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

export const combineTransactions = (data: Data[]): Data[] => {
  return data.map(dataItem => {
    const combinedTransactions = new Map<string, Transaction>();

    dataItem.transactions.forEach(transaction => {
      const { orderId } = transaction;

      if (!combinedTransactions.has(orderId)) {
        combinedTransactions.set(orderId, {
          ...transaction,
          Transaction_Detail: [...transaction.Transaction_Detail],
        });
      } else {
        const existingTransaction = combinedTransactions.get(orderId)!;
        existingTransaction.Transaction_Detail.push(...transaction.Transaction_Detail);
      }
    });

    return {
      ...dataItem,
      transactions: Array.from(combinedTransactions.values()),
    };
  });
};
