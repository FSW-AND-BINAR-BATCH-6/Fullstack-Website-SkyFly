export interface Seat {
  id: number;
  label: string;
  reserved: boolean;
}

// Generate seat data for 72 seats
export const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = 12;
  const cols = ["A", "B", "C", "D", "E", "F"];

  for (let i = 1; i <= rows; i++) {
    for (let j = 0; j < cols.length; j++) {
      seats.push({
        id: seats.length + 1,
        label: `${i}${cols[j]}`,
        reserved: Math.random() > 0.7, // Randomly reserve some seats
      });
    }
  }
  return seats;
};
