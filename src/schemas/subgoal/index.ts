import { z } from "zod";

export const createSubgoalSchema = z.object({
  goalId: z.string().min(1, { message: "Goal selection is required" }),
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(50, { message: "Title cannot exceed 50 characters" })
    .trim(),
  duration: z
    .number({ required_error: "Duration is required" })
    .int({ message: "Duration must be in days" })
    .gte(1, { message: "Duration must be at least 1 day" })
    .lte(365, { message: "Duration cannot exceed 1 year" }),
});
