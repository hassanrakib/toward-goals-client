import { isFuture, isToday } from "date-fns";
import { z } from "zod";

export const createTaskSchema = z.object({
  goalId: z.array(z.string()).min(1, { message: "Goal selection is required" }),
  subgoalId: z
    .string()
    .min(1, { message: "Subgoal selection is required" })
    .trim(),
  habitId: z
    .string()
    .min(1, { message: "Habit selection is required" })
    .trim(),
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
    .refine((date) => isToday(new Date(date)), {
      message: "Deadline must not exceed today.",
    }),
});
