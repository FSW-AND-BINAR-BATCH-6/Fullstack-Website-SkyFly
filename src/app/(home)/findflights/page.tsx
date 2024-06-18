// pages/findflights.tsx
import { FlightDetail } from "./flightDetail/FlightDetail";

export default function FindFlightsPage({
  searchParams,
}: {
  searchParams: { totalPassengers: string; departureDate?: string; from?: string; to?: string; seatClass?: string };
}) {
  return <FlightDetail searchParams={searchParams} />;
}
