"use client";

import { Button } from "@/components/ui/button";

const ButtonCheckout = () => {
  const handleCheckout = () => {
    window.location.href = "/complete";
  };

  return (
    <Button onClick={handleCheckout} className="mt-5 w-full">
      Checkout
    </Button>
  );
};

export default ButtonCheckout;
