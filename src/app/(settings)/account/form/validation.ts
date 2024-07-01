import { z } from "zod";

export const accountSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" }),
  familyName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .optional(),
  phoneNumber: z
    .string()
    .min(10, { message: "Invalid phone number" })
    .max(14, { message: "Invalid phone number" }),
  email: z.string(),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
