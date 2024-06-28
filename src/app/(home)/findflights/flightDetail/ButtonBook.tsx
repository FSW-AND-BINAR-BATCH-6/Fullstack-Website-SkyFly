import { Button } from "@/components/ui/button";
import React, { FC, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { toast } from "react-hot-toast";

interface ButtonBookProps {
  flightId: string;
}

const ButtonBook: FC<ButtonBookProps> = ({ flightId }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromCookie = getCookie(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    );
    setToken(tokenFromCookie ? tokenFromCookie.toString() : null);
  }, []);

  const handleClick = () => {
    if (!token) {
      toast.error(
        "You must to login first, before booking a flights!"
      );
    } else {
      setCookie("bookingDetails", flightId.toString());
      window.location.href = `/booking`;
    }
  };

  return (
    <>
      <Button onClick={handleClick} className="mt-2">
        Book Now
      </Button>
    </>
  );
};

export default ButtonBook;
