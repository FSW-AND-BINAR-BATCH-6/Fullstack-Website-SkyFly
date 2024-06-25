"use client";

import { Button } from "@/components/ui/button";

interface ButtonCheckoutProps {
  showCheckout: boolean;
}

const ButtonCheckout: React.FC<ButtonCheckoutProps> = ({
  showCheckout,
}) => {
  return <Button className="mt-5 w-full">Checkout</Button>;
};

export default ButtonCheckout;
