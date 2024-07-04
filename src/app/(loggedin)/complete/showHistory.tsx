"use client";

import { Button } from "@/components/ui/button";
import React, { FC } from "react";

interface ShowHistoryProps {}

const ShowHistory: FC<ShowHistoryProps> = ({}) => {
  const handleBookingHistory = () => {
    window.location.href = "/history";
  };

  return (
    <div>
      <Button onClick={handleBookingHistory} className="w-40 sm:w-60">
        Show Booking History
      </Button>
    </div>
  );
};

export default ShowHistory;
