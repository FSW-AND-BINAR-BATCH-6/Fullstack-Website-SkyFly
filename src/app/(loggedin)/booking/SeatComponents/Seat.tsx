interface SeatProps {
  index: number;
}

export default function Seat({ index }: SeatProps) {
  return (
    <div className="flex justify-center mt-3 gap-7">
      <div className="flex gap-5">
        <span className="border border-gray-300 rounded-sm bg-gray-300 h-10 w-10"></span>
        <span className="border border-gray-300 rounded-sm bg-gray-300 h-10 w-10"></span>
        <span className="border border-gray-300 rounded-sm bg-gray-300 h-10 w-10"></span>
      </div>
      <div className="flex items-center justify-center">
        <span className="border border-gray-300 rounded-sm bg-gray-300 p-2">
          {index + 1}
        </span>
      </div>
      <div className="flex gap-5">
        <span className="border border-gray-300 rounded-sm bg-gray-300 h-10 w-10"></span>
        <span className="border border-gray-300 rounded-sm bg-gray-300 h-10 w-10"></span>
        <span className="border border-gray-300 rounded-sm bg-gray-300 h-10 w-10"></span>
      </div>
    </div>
  );
}
