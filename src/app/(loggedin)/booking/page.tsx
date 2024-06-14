import BookingDetailings from "./[flightId]/page";

export default function bookingPage() {
  return <BookingDetailings params={{ flightId: "1" }} />;
}
