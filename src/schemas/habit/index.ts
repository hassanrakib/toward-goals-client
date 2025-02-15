import { HabitUnitNameForTime, HabitUnitType } from "@/types/habit";
import { z } from "zod";

const createHabitUnitSchema = z
  .object({
    type: z.array(z.string()).min(1, "Type is required"),
    name: z
      .string()
      .min(1, "Unit name is required")
      .min(2, "Habit unit name must be 2 characters long")
      .max(8, "Habit unit name must be at most 8 characters long")
      .trim(),
  })
  .refine(
    (data) => {
      if (data.type[0] === HabitUnitType.Time) {
        return Object.values(HabitUnitNameForTime).includes(
          data.name as HabitUnitNameForTime
        );
      }
      return true;
    },
    {
      message: `Unit name must be "${HabitUnitNameForTime.Minute}" if the unit type is Time`,
      path: ["name"],
    }
  );

const createHabitDifficultiesSchema = z
  .object({
    mini: z
      .number({
        required_error: "Mini difficulty level is required.",
      })
      .min(1, "Mini difficulty must be at least 1."),
    plus: z
      .number({
        required_error: "Plus difficulty level is required.",
      })
      .min(2, "Plus difficulty must be at least 2."),
    elite: z
      .number({
        required_error: "Elite difficulty level is required.",
      })
      .min(3, "Elite difficulty must be at least 3."),
  })
  .refine((data) => data.plus > data.mini, {
    message: "Plus difficulty must be greater than mini difficulty",
    path: ["plus"],
  })
  .refine((data) => data.elite > data.plus, {
    message: "Elite difficulty must be greater than Plus difficulty.",
    path: ["elite"],
  });

export const createHabitSchema = z.object({
  goalId: z.array(z.string()).min(1, { message: "Goal selection is required" }),
  title: z
    .string()
    .min(1, "Habit title is required.")
    .min(3, "Habit title must be at least 3 characters long.")
    .max(50, "Habit title must be at most 50 characters long."),
  unit: createHabitUnitSchema,
  difficulties: createHabitDifficultiesSchema,
});
