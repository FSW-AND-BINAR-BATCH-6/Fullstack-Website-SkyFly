import { Button } from "@/components/ui/button";
import React, { FC, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { toast } from "react-hot-toast";

interface ButtonBookProps {
  flightId: string;
}

const ButtonBook: FC<ButtonBookProps> = ({ flightId }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromCookie = getCookie("token");
    setToken(tokenFromCookie ? tokenFromCookie.toString() : null);
  }, []);

  const handleClick = () => {
    if (!token) {
      toast.error(
        "You must to login first, before booking a flights!"
      );
    } else {
      window.location.href = `/booking/${flightId}`;
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
