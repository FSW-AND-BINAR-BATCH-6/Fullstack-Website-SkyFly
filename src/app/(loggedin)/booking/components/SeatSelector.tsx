import { useEffect } from "react";
import { Seat } from "./generateSeats";
import { seatByFlightId } from "./actionsSeat";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

export const SeatSelector: React.FC<{
  seats: Seat[];
  selectedSeats: number[];
  handleSeatChange: (seatId: number) => void;
}> = ({ seats, selectedSeats, handleSeatChange }) => {
  useEffect(() => {
    const fetchSeats = async () => {
      const seats = getCookie("bookingDetails");
      if (typeof seats !== "string") {
        toast.error("Seats is missing or invalid.");
        return;
      }
      try {
        const data = await seatByFlightId(seats);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSeats();
  }, []);

  const renderSeats = (seatGroup: Seat[]) => (
    <>
      {seatGroup.map((seat) => (
        <div className="relative seat" key={seat.id}>
          <input
            type="checkbox"
            className="absolute opacity-0 peer"
            id={`seat-${seat.id}`}
            checked={selectedSeats.includes(seat.id)}
            onChange={() => handleSeatChange(seat.id)}
            disabled={seat.reserved}
          />
          <label
            htmlFor={`seat-${seat.id}`}
            className={`block w-full text-center text-sm font-bold leading-6 py-1 rounded text-black hover:cursor-pointer hover:shadow-[0_0_0_2px_green] peer-checked:bg-violet peer-checked:text-white ${
              seat.reserved
                ? "bg-gray-400 text-gray-500 cursor-not-allowed"
                : "bg-green-400"
            }`}
          >
            {seat.label}
          </label>
        </div>
      ))}
    </>
  );

  return (
    <div className="gap-[4.5rem] mt-3 mx-auto flex">
      <div className="grid grid-cols-3 gap-4 w-[10rem]">
        <span className="text-center">A</span>
        <span className="text-center">B</span>
        <span className="text-center">C</span>
        {renderSeats(
          seats.filter(
            (seat) =>
              seat.label.endsWith("A") ||
              seat.label.endsWith("B") ||
              seat.label.endsWith("C")
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
              seat.label.endsWith("D") ||
              seat.label.endsWith("E") ||
              seat.label.endsWith("F")
          )
        )}
      </div>
    </div>
  );
};
