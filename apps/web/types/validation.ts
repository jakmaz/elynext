import { z } from "zod";

export const schemaRegister = z.object({
  first_name: z.string().min(2).max(100, {
    message: "First name must be between 2 and 100 characters",
  }),
  last_name: z.string().min(2).max(100, {
    message: "Last name must be between 2 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
});

export const schemaLogin = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
});

export const schemaStartTrip = z.object({
  start_location: z.string().min(1, { message: "Start location is required" }),
  start_meter: z
    .number()
    .positive({ message: "Valid meter reading is required" }),
});
