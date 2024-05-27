import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
import Image from "next/image";

export default function CompletePage() {
  return (
    <div className="w-4/5 mx-auto">
      <div className="ps-10 pt-10 pb-20 flex flex-col items-center justify-center">
        <Image
          src="/assets/payment-complete.svg"
          alt="logo"
          width={300}
          height={300}
          className="w-50 h-50 bg-cover"
        />
        <div className="mt-5">
          <Labels className="font-bold text-lg flex items-center justify-center text-violet">
            Congratulation!
          </Labels>
          <Labels className="flex flex-col font-bold mt-1">
            Payment Transaction Tickets is Successfully!
          </Labels>
        </div>
        <div className="mt-5">
          <Button className="w-60">Show Tickets</Button>
          <Button className="flex flex-col mt-3 w-60 bg-violet-400">
            Find Other Flights
          </Button>
        </div>
      </div>
    </div>
  );
}
