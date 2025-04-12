import { endOfToday, isBefore, isFuture } from "date-fns";
import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    goal: z.array(z.string()).min(1, { message: "Goal selection is required" }),
    habit: z
      .array(z.string())
      .min(1, { message: "Habit selection is required" }),
    title: z
      .string()
      .min(1, { message: "Title is required" })
      .min(5, { message: "Title must be at least 5 characters long" })
      .max(50, { message: "Title cannot exceed 50 characters" })
      .trim(),
    deadline: z
      .date({
        required_error: "Deadline is required",
        invalid_type_error: "Deadline is not valid",
      })
      .refine((date) => isFuture(date), {
        message: "Deadline must be in the future",
      })
      .refine((date) => isBefore(new Date(date), endOfToday()), {
        message: "Deadline must not exceed today.",
      }),
  }),
});
