import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
import Image from "next/image";
import ShowTicket from "./showTickets";

export default function CompletePage() {
  return (
    <div className="w-full sm:w-4/5 mx-auto">
      <div className="px-5 sm:px-10 pt-10 pb-20 flex flex-col items-center justify-center">
        <Image
          src="/assets/payment-complete.svg"
          alt="logo"
          width={300}
          height={300}
          className="w-40 h-40 sm:w-50 sm:h-50 bg-cover"
        />
        <div className="mt-5 text-center">
          <Labels className="font-bold text-lg text-violet">
            Congratulation!
          </Labels>
          <Labels className="flex flex-col font-bold mt-1">
            Payment Transaction Tickets is Successfully!
          </Labels>
        </div>
        <div className="mt-5 flex flex-col items-center">
          <ShowTicket />
          <Button className="mt-3 w-40 sm:w-60 bg-violet-400">
            Find Other Flights
          </Button>
        </div>
      </div>
    </div>
  );
}
