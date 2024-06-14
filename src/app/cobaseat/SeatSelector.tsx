"use client";
import React, { useState } from "react";

interface Seat {
  id: number;
  label: string;
  reserved: boolean;
}

const seats: Seat[] = [
  { id: 1, label: "1A", reserved: false },
  { id: 2, label: "1B", reserved: true }, // Kursi yang sudah dipesan
  { id: 3, label: "1C", reserved: false },
  { id: 4, label: "2A", reserved: false },
  { id: 5, label: "2B", reserved: false },
  { id: 6, label: "2C", reserved: false },
];

const SeatSelector: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatChange = (seatId: number) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((id) => id !== seatId)
        : [...prevSelectedSeats, seatId]
    );
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Pilih Kursi:</h2>
      <div className="grid grid-cols-3 gap-4">
        {seats.map((seat, index) => (
          <div
            className={`relative seat ${
              index === 2 ? "mr-[14%]" : ""
            }`}
            key={seat.id}
          >
            <input
              type="checkbox"
              className="absolute opacity-0 peer"
              id={`seat-${seat.id}`}
              checked={selectedSeats.includes(seat.id)}
              onChange={() => handleSeatChange(seat.id)}
              disabled={seat.reserved} // Menonaktifkan input jika kursi sudah dipesan
            />
            <label
              htmlFor={`seat-${seat.id}`}
              className={`block w-full text-center text-sm font-bold leading-6 py-1 rounded text-black hover:cursor-pointer hover:shadow-[0_0_0_2px_green] peer-checked:bg-gray-600 ${
                seat.reserved
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-400"
              }`}
            >
              {seat.label}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Kursi Terpilih:</h3>
        {selectedSeats.length > 0 ? (
          <ul className="list-disc list-inside mt-2">
            {selectedSeats.map((seatId) => {
              const seat = seats.find((s) => s.id === seatId);
              return <li key={seatId}>{seat?.label}</li>;
            })}
          </ul>
        ) : (
          <p className="mt-2">Tidak ada kursi yang dipilih.</p>
        )}
      </div>
    </div>
  );
};

export default SeatSelector;
