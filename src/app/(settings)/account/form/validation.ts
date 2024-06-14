import { z } from "zod";

export const accountSchema = z.object({
  fullname: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" }),
  familyName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .optional(),
  phoneNumber: z
    .string()
    .min(10, { message: "Invalid phone number" })
    .max(13, { message: "Invalid phone number" }),
  email: z.string().email({ message: "Invalid email address" }),
});
