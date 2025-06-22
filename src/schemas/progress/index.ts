import { z } from "zod";

export const updateSubgoalProgressKeyMilestonesSchema = z.object({
  keyMilestones: z.array(
    z.object({
      milestone: z
        .string()
        .min(1, "Milestone is required")
        .min(5, "Milestone must be at least 5 characters long"),
    })
  ),
});
