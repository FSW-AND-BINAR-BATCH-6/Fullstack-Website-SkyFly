"use client";

import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { seatByFlightId } from "./actions";

export interface PassengerCounts {
  adults: number;
  child: number;
  babies: number;
}

export type Seat = {
  flightId: string;
  id: number;
  price: number;
  seatNumber: string;
  status: string;
  type: string;
};

export const useSeatSelection = () => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [flightId, setFlightId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [bookCheck, setBookCheck] = useState<boolean>(false);
  const [passengCheck, setPassengCheck] = useState<boolean>(false);
  const [seatLabels, setSeatLabels] = useState<
    Record<string, string>
  >({});
  const [passengerCounts, setPassengerCounts] =
    useState<PassengerCounts>({ adults: 0, child: 0, babies: 0 });

  const totalPassengers =
    passengerCounts.adults +
    passengerCounts.child +
    passengerCounts.babies;

  useEffect(() => {
    const fetchSeats = async () => {
      const flightId = getCookie("bookingDetails");
      if (typeof flightId !== "string") {
        toast.error("Flight ID is missing or invalid.");
        return;
      }
      try {
        const data: any = await seatByFlightId(flightId);
        setSeats(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSeats();
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("bayik");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData) as PassengerCounts;
        setPassengerCounts(parsedData);
      } catch (error) {
        console.error(
          "Error parsing stored passenger counts:",
          error
        );
      }
    }
  }, []);

  useEffect(() => {
    const bookingDetails = getCookie("bookingDetails");
    setFlightId(
      bookingDetails !== undefined ? (bookingDetails as string) : null
    );
  }, []);

  const handleSeatChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    seat: Seat
  ) => {
    if (e.target.checked) {
      if (selectedSeats.length < totalPassengers) {
        const newLabel = `P${selectedSeats.length + 1}`;
        setSelectedSeats([...selectedSeats, seat]);
        setSeatLabels({ ...seatLabels, [seat.id]: newLabel });
      } else {
        e.target.checked = false;
        alert(`You can only select up to ${totalPassengers} seats.`);
      }
    } else {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
      const newLabels = { ...seatLabels };
      delete newLabels[seat.id];
      setSeatLabels(newLabels);
    }
  };

  const availableSeats = seats.filter(
    (seat) => seat.status === "AVAILABLE"
  );

  const seatClass = localStorage.getItem("seatClass");

  return {
    seats,
    selectedSeats,
    seatLabels,
    passengerCounts,
    flightId,
    availableSeats,
    seatClass,
    bookCheck,
    passengCheck,
    isLoading,
    isDisabled,
    setIsLoading,
    setIsDisabled,
    setBookCheck,
    setPassengCheck,
    setSelectedSeats,
    setSeatLabels,
    setPassengerCounts,
    handleSeatChange,
  };
};
