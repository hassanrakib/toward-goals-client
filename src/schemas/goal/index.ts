import { isFuture } from "date-fns";
import { z } from "zod";

export const createGoalSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(60, { message: "Title cannot exceed 60 characters" })
    .trim(),
  userLimit: z
    .number()
    .int({ message: "User limit can not be a decimal number" })
    .positive({ message: "User limit must be at least 1" })
    .lte(200, { message: "User limit cannot exceed 200" }),
  startDate: z
    .date({
      required_error: "Start date is required",
      invalid_type_error: "Start date is not valid",
    })
    .refine((date) => isFuture(date), {
      message: "Start date must be in the future",
    }),
  duration: z
    .number()
    .int({ message: "Duration must be in days" })
    .gte(7, { message: "Duration must be at least 7 days" })
    .lte(365 * 5, { message: "Duration cannot exceed 5 years" }),
});
