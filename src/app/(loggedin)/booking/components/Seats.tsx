import { Skeleton } from "@/components/ui/skeleton";
import { Seat } from "./useSeatSelection";

export type Props = {
  seats: Seat[];
  selectedSeats: Seat[];
  isDisabled: boolean;
  seatLabels: { [key: number]: string };
  handleSeatChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    seat: Seat
  ) => void;
  seatLoading: boolean;
};

const renderSeats = (
  seats: Seat[],
  selectedSeats: Seat[],
  isDisabled: boolean,
  seatLabels: { [key: number]: string },
  handleSeatChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    seat: Seat
  ) => void
) => {
  return seats.map((seat) => (
    <div key={seat.id} className="">
      <label className="block w-full text-center text-sm font-bold text-black">
        <input
          className="absolute opacity-0"
          type="checkbox"
          name={`seat-${seat.seatNumber}`}
          value={seat.id}
          onChange={(e) => {
            handleSeatChange(e, seat);
          }}
          disabled={seat.status !== "AVAILABLE" || isDisabled}
        />
        <span
          className={`text-black rounded-md flex items-center justify-center w-10 h-10 ${
            seat.status !== "AVAILABLE"
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : selectedSeats.find((s) => s.id === seat.id)
              ? "bg-violet cursor-pointer hover:shadow-[0_0_0_2px_violet] text-white"
              : "bg-green-500 cursor-pointer hover:shadow-[0_0_0_2px_green]"
          } `}
        >
          {seatLabels[seat.id] || seat.seatNumber}
        </span>
      </label>
    </div>
  ));
};

const SeatComponent: React.FC<Props> = ({
  seats,
  selectedSeats,
  isDisabled,
  seatLabels,
  handleSeatChange,
  seatLoading,
}) => {
  if (seatLoading) {
    return (
      <div className="gap-8 mt-3 mx-auto flex flex-col lg:flex-row">
        <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
          <span className="text-center">A</span>
          <span className="text-center">B</span>
          <span className="text-center">C</span>
          {[...Array(30)].map((_, idx) => (
            <Skeleton
              key={`A-${idx}`}
              className="h-10 w-10 mx-auto"
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
          <span className="text-center">D</span>
          <span className="text-center">E</span>
          <span className="text-center">F</span>
          {[...Array(30)].map((_, idx) => (
            <Skeleton
              key={`D-${idx}`}
              className="h-10 w-10 mx-auto"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="gap-8 mt-3 mx-auto flex flex-col lg:flex-row">
      <div className="grid grid-cols-3 gap-4 w-full lg:w-[10rem]">
        <span className="text-center">A</span>
        <span className="text-center">B</span>
        <span className="text-center">C</span>
        {renderSeats(
          seats.filter(
            (seat) =>
              seat.seatNumber.endsWith("A") ||
              seat.seatNumber.endsWith("B") ||
              seat.seatNumber.endsWith("C")
          ),
          selectedSeats,
          isDisabled,
          seatLabels,
          handleSeatChange
        )}
      </div>
      <div className="grid grid-cols-3 gap-4 w-full lg:w-[10rem]">
        <span className="text-center">D</span>
        <span className="text-center">E</span>
        <span className="text-center">F</span>
        {renderSeats(
          seats.filter(
            (seat) =>
              seat.seatNumber.endsWith("D") ||
              seat.seatNumber.endsWith("E") ||
              seat.seatNumber.endsWith("F")
          ),
          selectedSeats,
          isDisabled,
          seatLabels,
          handleSeatChange
        )}
      </div>
    </div>
  );
};

export default SeatComponent;
