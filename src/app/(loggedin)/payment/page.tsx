import { Metadata } from "next";
import PaymentPage from "./form";

export const metadata: Metadata = {
  title: "Payment Gateway | SkyFly",
  description: "Generated by create next app",
};

export default function PaymentMethodPage() {
  return <PaymentPage />;
}
