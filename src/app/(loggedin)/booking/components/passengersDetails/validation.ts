import { z } from "zod";

export const passengersSchema = z.object({
  title: z.string().min(2, { message: "Invalid title" }),
  fullname: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" }),
  familyName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .optional(),
  dateOfBirth: z
    .string()
    .min(10, { message: "Invalid date of birth" }),
  citizenship: z.string().min(3, { message: "Invalid citizenship" }),
  passport: z.string().min(8, { message: "Invalid passport" }),
  country: z.string().min(3, { message: "Invalid country" }),
  invalid: z.string().min(10, { message: "Invalid date" }),
});
