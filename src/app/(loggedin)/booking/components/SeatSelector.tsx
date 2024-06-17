import { useEffect, useState } from "react";
import { seatByFlightId, SeatById } from "./actionsSeat";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

export const SeatSelector: React.FC<{
  selectedSeats: string[];
  handleSeatChange: (seatId: string) => void;
}> = ({ selectedSeats, handleSeatChange }) => {
  const [seats, setSeats] = useState<SeatById[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeats = async () => {
      const flightId = getCookie("bookingDetails");
      if (typeof flightId !== "string") {
        toast.error("Flight ID is missing or invalid.");
        return;
      }
      try {
        const data: any = await seatByFlightId(flightId);
        console.log(data);
        setSeats(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSeats();
  }, []);

  const renderSeats = (seatGroup: SeatById[]) => (
    <>
      {seatGroup.map((seat) => (
        <div className="relative seat" key={seat.id}>
          <input
            type="checkbox"
            className="absolute opacity-0 peer"
            id={`seat-${seat.id}`}
            checked={selectedSeats.includes(seat.id)}
            onChange={() => handleSeatChange(seat.id)}
            disabled={seat.status === "booked"}
          />
          <label
            htmlFor={`seat-${seat.id}`}
            className={`block w-full text-center text-sm font-bold leading-6 py-1 rounded text-black hover:cursor-pointer hover:shadow-[0_0_0_2px_green] peer-checked:bg-violet peer-checked:text-white ${
              seat.status === "booked"
                ? "bg-gray-400 text-gray-500 cursor-not-allowed"
                : "bg-green-400"
            }`}
          >
            {seat.seatNumber}
          </label>
        </div>
      ))}
    </>
  );

  if (loading) {
    return (
      <div className="gap-[4.5rem] mt-3 mx-auto flex">
        <div className="grid grid-cols-3 gap-4 w-[10rem]">
          <span className="text-center">A</span>
          <span className="text-center">B</span>
          <span className="text-center">C</span>
          {[...Array(30)].map((_, idx) => (
            <Skeleton key={`A-${idx}`} className="h-10 w-full" />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 w-[10rem]">
          <span className="text-center">D</span>
          <span className="text-center">E</span>
          <span className="text-center">F</span>
          {[...Array(30)].map((_, idx) => (
            <Skeleton key={`D-${idx}`} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="gap-[4.5rem] mt-3 mx-auto flex">
      <div className="grid grid-cols-3 gap-4 w-[10rem]">
        <span className="text-center">A</span>
        <span className="text-center">B</span>
        <span className="text-center">C</span>
        {renderSeats(
          seats.filter(
            (seat) =>
              seat.seatNumber.endsWith("A") ||
              seat.seatNumber.endsWith("B") ||
              seat.seatNumber.endsWith("C")
          )
        )}
      </div>
      <div className="grid grid-cols-3 gap-4 w-[10rem]">
        <span className="text-center">D</span>
        <span className="text-center">E</span>
        <span className="text-center">F</span>
        {renderSeats(
          seats.filter(
            (seat) =>
              seat.seatNumber.endsWith("D") ||
              seat.seatNumber.endsWith("E") ||
              seat.seatNumber.endsWith("F")
          )
        )}
      </div>
    </div>
  );
};
