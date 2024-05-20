import { z } from "zod";

export const formSchema = z.object({
  from: z
    .string()
    .min(1, { message: "Departure location is required" }),
  to: z
    .string()
    .min(1, { message: "Destination location is required" }),
  departureDate: z
    .string()
    .min(1, { message: "Departure date is required" }),
  returnDate: z.string().optional(),
  passengers: z.string().min(1, { message: "Passenger is required" }),
  seatClass: z.string().min(1, { message: "Seat class is required" }),
});
