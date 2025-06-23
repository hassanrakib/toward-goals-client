import { isFuture, isToday } from "date-fns";
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(60, { message: "Title cannot exceed 60 characters" }),
  html: z.string(),
  extracted: z.object({
    goalId: z
      .string()
      .min(1, { message: "Please select goal writing @goal" })
      .trim(),
    subgoalId: z
      .string()
      .min(1, { message: "Please select subgoal writing @subgoal" })
      .trim(),
    habitId: z
      .string()
      .min(1, { message: "Please select habit writing @habit" })
      .trim(),
    deadline: z
      .string()
      .min(1, { message: "Please select deadline writing @deadline" })
      .datetime()
      .refine((date) => isFuture(new Date(date)), {
        message: "Deadline must be in the future",
      })
      .refine((date) => isToday(new Date(date)), {
        message: "Deadline must not exceed today.",
      }),
  }),
});
